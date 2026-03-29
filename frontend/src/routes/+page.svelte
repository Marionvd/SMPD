<script lang="ts">
  import { onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let videoElement = $state<HTMLVideoElement>();
  let canvasElement = $state<HTMLCanvasElement>();

  let apiUrl = $state(
    "https://remigial-tiffanie-pseudoancestrally.ngrok-free.dev",
  );

  let isMonitoring = $state(false);
  let status = $state("IDLE");
  let boxes = $state<number[][]>([]);
  let description = $state("Waiting to start...");
  let fireType = $state("");

  let applyingFlashClass = $state(false);
  let analysisInterval: ReturnType<typeof setInterval> | undefined;

  function getUIStatusColor(
    currentStatus: string,
    currentFireType: string,
  ): string {
    if (currentStatus === "IDLE") return "#888";
    if (currentStatus === "CRITICAL") return "#ff3e3e";
    if (
      currentStatus === "SAFE" &&
      (currentFireType === "candle" || currentFireType === "contained_fire")
    ) {
      return "#00e5ff";
    }
    return "#00ff88";
  }

  let uiThemeColor = $derived(getUIStatusColor(status, fireType));

  async function toggleMonitoring() {
    if (isMonitoring) {
      stopMonitoring();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (videoElement) {
        videoElement.srcObject = stream;
        await videoElement.play();
      }
      isMonitoring = true;
      status = "SAFE";
      description = "Camera is active. Scanning...";

      analysisInterval = setInterval(captureAndSend, 3000);
    } catch (err) {
      console.error("Camera access error:", err);
      alert(
        "Camera access is required to use the scanner. Please allow camera permissions and try again.",
      );
    }
  }

  function stopMonitoring() {
    isMonitoring = false;
    if (analysisInterval) clearInterval(analysisInterval);

    const stream = videoElement?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
    }
    status = "IDLE";
    description = "Scanner stopped.";
    fireType = "";
    boxes = [];
    applyingFlashClass = false;
  }

  async function captureAndSend() {
    if (!isMonitoring || !videoElement || !canvasElement) return;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    ctx.drawImage(videoElement, 0, 0);

    canvasElement.toBlob(
      async (blob: Blob | null) => {
        if (!blob) return;
        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");

        try {
          const cleanUrl = apiUrl.replace(/\/$/, "");

          const response = await fetch(`${cleanUrl}/analyze/fire`, {
            method: "POST",
            body: formData,
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          });

          if (response.ok) {
            const data = await response.json();

            // Логика Красной Вспышки при переходе в CRITICAL
            if (data.status === "CRITICAL" && status !== "CRITICAL") {
              applyingFlashClass = true;
              setTimeout(() => (applyingFlashClass = false), 700);
            }

            status = data.status || "SAFE";
            boxes = data.boxes || [];

            if (data.vlm) {
              description = data.vlm.description || "Analysis completed";
              fireType = data.vlm.fire_type || "";
            }
          }
        } catch (e) {
          console.error("Error connecting to API:", e);
        }
      },
      "image/jpeg",
      0.7,
    );
  }

  onDestroy(() => {
    if (browser) stopMonitoring();
  });
</script>

<main
  class:applying-flash={applyingFlashClass}
  class:is-idle={status === "IDLE"}
  class:is-critical={status === "CRITICAL"}
  class:is-safe={status === "SAFE" &&
    (!fireType || (fireType !== "candle" && fireType !== "contained_fire"))}
  class:is-contained={status === "SAFE" &&
    (fireType === "candle" || fireType === "contained_fire")}
  style="--ui-status-color: {uiThemeColor}"
>
  <div class="viewport">
    <video bind:this={videoElement} autoplay playsinline muted></video>

    {#if videoElement && isMonitoring && videoElement.videoWidth > 0}
      {#each boxes as box}
        <div
          class="yolo-box"
          style="
          left: {(box[0] / videoElement.videoWidth) * 100}%;
          top: {(box[1] / videoElement.videoHeight) * 100}%;
          width: {((box[2] - box[0]) / videoElement.videoWidth) * 100}%;
          height: {((box[3] - box[1]) / videoElement.videoHeight) * 100}%;
        "
        >
          <div class="box-tag">{fireType || "DETECTION"}</div>
        </div>
      {/each}
    {/if}
  </div>

  <div class="interface">
    <div class="top-bar">
      <div class="indicator">
        <div class="pulse-dot"></div>
        <span>{status}</span>
      </div>
      <div class="brand">VERINODE <span>v2.3</span></div>
    </div>

    <div class="bottom-controls">
      <div class="data-card">
        <p>{description}</p>
        {#if fireType && status !== "IDLE"}
          <span class="badge">{fireType.replace("_", " ")}</span>
        {/if}
      </div>

      <div class="actions">
        {#if !isMonitoring}
          <input type="text" bind:value={apiUrl} placeholder="Server URL" />
        {/if}
        <button onclick={toggleMonitoring} class:active={isMonitoring}>
          {isMonitoring ? "STOP SCANNER" : "INITIALIZE SCANNER"}
        </button>
      </div>
    </div>
  </div>

  <canvas bind:this={canvasElement} class="hidden"></canvas>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :global(html),
  :global(body) {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    position: fixed;
  }

  main {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #000;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: sans-serif;
    transition: 0.3s background-color ease;
  }

  main::before,
  main::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 10;
    transition:
      box-shadow 0.4s ease,
      background-color 0.4s ease;
  }

  main::before {
    box-shadow: inset 0 0 40px -15px var(--status-color);
    animation: wave-1 4s infinite alternate ease-in-out;
  }

  main::after {
    box-shadow: inset 0 0 55px -25px var(--status-color);
    animation: wave-2 2.5s infinite alternate ease-in-out;
    opacity: 0.5;
  }

  main.is-idle {
    --status-color: rgba(136, 136, 136, 0.2);
  }

  main.is-safe {
    --status-color: rgba(0, 168, 94, 0.12);
  }

  main.is-contained {
    --status-color: rgba(0, 229, 255, 0.4);
  }

  main.is-critical {
    --status-color: rgba(255, 62, 62, 1);
  }

  main.applying-flash {
    background-color: #ff3e3e;
    transition:
      background-color 0.05s ease-in,
      box-shadow 0.05s ease-in;
    box-shadow: inset 0 0 150px 50px rgba(255, 62, 62, 1);
  }

  main.applying-flash::before,
  main.applying-flash::after {
    animation: wave-critical-flash 0.7s ease-out forwards;
    box-shadow: none;
  }

  @keyframes wave-critical-flash {
    0% {
      box-shadow: inset 0 0 200px rgba(255, 62, 62, 1);
      opacity: 1;
    }
    100% {
      box-shadow: inset 0 0 70px rgba(255, 62, 62, 1);
      opacity: 1;
    }
  }

  .viewport {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: #050505;
    overflow: hidden;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hidden {
    display: none;
  }

  .interface {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    pointer-events: none;
    overflow-x: hidden;
  }

  .top-bar {
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(15px);
    padding: 15px 20px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.08);
    pointer-events: auto;
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  .indicator {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    font-size: 0.9rem;
    color: var(--ui-status-color);
    transition: 0.3s color;
  }
  .pulse-dot {
    width: 10px;
    height: 10px;
    background: currentColor;
    border-radius: 50%;
    animation: pulse-indicator 1.5s infinite;
  }

  .brand {
    font-size: 1rem;
    letter-spacing: 2px;
    font-weight: 300;
  }
  .brand span {
    color: #ffaa00;
    font-weight: bold;
    font-size: 0.7rem;
  }

  .bottom-controls {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-bottom: env(safe-area-inset-bottom, 10px);
    width: 100%;
  }

  .data-card {
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(15px);
    padding: 15px;
    border-radius: 15px;
    color: white;
    border-left: 4px solid var(--ui-status-color);
    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.3);
  }

  .data-card p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
    color: #eee;
  }
  .badge {
    display: inline-block;
    margin-top: 10px;
    font-size: 0.7rem;
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  input {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 14px;
    border-radius: 10px;
    color: white;
    font-size: 0.9rem;
    outline: none;
  }
  input:focus {
    border-color: var(--ui-status-color);
  }
  button {
    background: #ffffff;
    color: #000;
    border: none;
    padding: 16px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.2s all;
  }
  button:active {
    transform: scale(0.98);
  }
  button.active {
    background: #ff3e3e;
    color: #fff;
  }

  .yolo-box {
    position: absolute;
    border: 2px solid var(--ui-status-color);
    pointer-events: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition:
      0.1s linear,
      border-color 0.3s ease;
    z-index: 5;
  }
  .box-tag {
    position: absolute;
    top: -24px;
    left: -2px;
    background: var(--ui-status-color);
    color: white;
    font-size: 10px;
    padding: 4px 8px;
    font-weight: bold;
    text-transform: uppercase;
  }

  @keyframes wave-1 {
    0% {
      box-shadow: inset 0 0 35px -20px var(--status-color);
      opacity: 0.6;
    }
    100% {
      box-shadow: inset 0 0 45px -10px var(--status-color);
      opacity: 0.8;
    }
  }

  @keyframes wave-2 {
    0% {
      box-shadow: inset 0 0 65px -35px var(--status-color);
      opacity: 0.3;
    }
    100% {
      box-shadow: inset 0 0 55px -15px var(--status-color);
      opacity: 0.6;
    }
  }

  @keyframes pulse-indicator {
    0% {
      opacity: 1;
      box-shadow: 0 0 8px currentColor;
    }
    50% {
      opacity: 0.3;
      box-shadow: 0 0 2px currentColor;
    }
    100% {
      opacity: 1;
      box-shadow: 0 0 8px currentColor;
    }
  }
</style>
