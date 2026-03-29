# VeriNode: FireWatch Light

VeriNode is a lightweight, hybrid fire detection system utilizing a cascaded neural network architecture. First, a fast YOLO model identifies potential fire or smoke sources. Then, a Vision Language Model (VLM) analyzes the cropped frame to filter out false positives (such as lamps, sunsets, or BBQs), ensuring high accuracy and reliability.

## 🛠 Tech Stack

- **Backend:** Python, FastAPI, Uvicorn
- **Computer Vision (Stage 1):** Ultralytics YOLOv8/v11 (`fire_smoke.pt`)
- **Vision Language Model (Stage 2):** Qwen2.5-VL (via local OpenAI-compatible API)
- **Frontend:** Svelte 5 / Vite
- **Tunneling & Network:** Ngrok

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Python 3.10+**
2. **Node.js** and **npm** (for the Svelte frontend)
3. **Ngrok Account** (required for serving the app over HTTPS to access mobile cameras)
4. A local VLM server (e.g., **LM Studio** or **Ollama**) running on port `1234`.

---

## ⚙️ Installation & Setup

### 1. Backend Setup (Python)

Open your terminal in the backend directory (where `main.py` is located) and run the following commands:

```bash
# Create a virtual environment
python -m venv venv

# Activate the environment (Linux/macOS)
source venv/bin/activate
# Note for Windows users: run `venv\Scripts\activate` instead

# Install all required dependencies
pip install fastapi uvicorn opencv-python numpy httpx python-multipart openai ultralytics
```

**Important:** Make sure your YOLO weights file (`fire_smoke.pt`) is placed in the same directory as `stage1_logic.py`.

### 2. Frontend Setup (Svelte)

Open a new terminal window, navigate to your frontend directory, and install the dependencies:

```bash
# Navigate to frontend folder and install npm packages
npm install
```

### 3. Local VLM Setup

1. Open **LM Studio** (or your preferred OpenAI-compatible local server).
2. Load a vision-capable model (e.g., `qwen2.5-vl:3b`).
3. Start the Local Inference Server on port `1234` (Endpoint: `http://127.0.0.1:1234/v1`).

---

## 🚀 Running the System

### Step 1: Start Ngrok (Crucial for Mobile Camera Access)

Mobile browsers strictly require a secure HTTPS connection to access the device's camera. We use **Ngrok** to expose our local servers to the internet.

In a new terminal, run:

```bash
# If using a single static domain for your backend:
ngrok http --url=YOUR-STATIC-DOMAIN.ngrok-free.dev 8000

# OR if you configured ngrok.yml for both frontend and backend:
ngrok start --all
```

### Step 2: Update the Ngrok Link in the Code (CRITICAL) ⚠️

Before starting the frontend, you **must** update the API URL in the Svelte code so it knows where to send the frames.

1. Open `src/routes/+page.svelte` in your code editor.
2. Find the `apiUrl` variable near the top of the `<script>` block.
3. Replace the placeholder with the actual HTTPS link you just got from the Ngrok terminal:

```javascript
// Replace this with your active Ngrok URL
let apiUrl = $state(
  "[https://YOUR-NEW-URL.ngrok-free.dev](https://YOUR-NEW-URL.ngrok-free.dev)",
);
```

### Step 3: Start the Backend Server

In the terminal with your activated Python virtual environment, run:

```bash
python main.py
```

_The server will start on `http://0.0.0.0:8000` and wait for requests._

### Step 4: Start the Frontend Application

In your frontend terminal, start the Vite development server:

```bash
npm run dev
```

---

## 📱 Usage

1. Open the Ngrok frontend HTTPS URL on your mobile device (or PC).
2. Grant the browser permission to access your camera.
3. Tap the **INITIALIZE SCANNER** button.
4. The system will start sending frames to the backend. If YOLO detects a potential fire, the frame is instantly forwarded to the VLM for verification. The UI will dynamically change its ambient color based on the threat level.
