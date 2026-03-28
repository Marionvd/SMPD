import uvicorn
import cv2
import numpy as np
import base64
import json
import re
import httpx
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI

import stage1_logic as s1

app = FastAPI(title="VeriNode: FireWatch Light")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vlm_client = AsyncOpenAI(
    base_url="http://127.0.0.1:1234/v1", 
    api_key="ollama",
    http_client=httpx.AsyncClient(timeout=60.0)
)

def encode_frame(frame):
    resized = cv2.resize(frame, (448, 448))
    _, buffer = cv2.imencode(".jpg", resized, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
    return base64.b64encode(buffer).decode("utf-8")

def extract_json(text):
    try:
        match = re.search(r'(\{.*\})', text, re.DOTALL)
        if match:
            return json.loads(match.group(1))
    except:
        pass
    return {"is_fire": "YES" in text.upper(), "description": text[:50]}

async def vlm_verify_single_frame(frame, yolo_count):
    prompt = f"""
    Analyze this image. YOLO detected {yolo_count} potential fire sources.
    Is it a real dangerous fire/smoke or a false alarm (like a lamp, sunset, or BBQ)?
    
    Think briefly and return ONLY a JSON object:
    {{
        "is_fire": bool,
        "description": "Short explanation of what you see",
        "confidence": 0-100
    }}
    """
    
    content = [
        {"type": "text", "text": prompt},
        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{encode_frame(frame)}"}}
    ]

    try:
        response = await vlm_client.chat.completions.create(
            model="qwen2.5-vl:3b",
            messages=[{"role": "user", "content": content}],
            temperature=0.1
        )
        
        raw_text = response.choices[0].message.content
        print(f"\n🧠 AI Analysis:\n{raw_text}\n")
        
        return extract_json(raw_text)
    except Exception as e:
        return {"error": str(e), "is_fire": False}

@app.post("/analyze/fire")
async def fire_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    frame = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)
    
    if frame is None:
        return {"status": "ERROR"}

    bboxes = s1.detect_fire_stage1(frame)
    
    if len(bboxes) > 0:
        print(f"⚠️ YOLO Triggered! Checking frame with VLM...")
        vlm_res = await vlm_verify_single_frame(frame, len(bboxes))
        
        is_fire = vlm_res.get("is_fire", False)
        return {
            "status": "CRITICAL" if is_fire else "SAFE",
            "boxes": bboxes,
            "vlm": vlm_res
        }

    return {
        "status": "SAFE",
        "boxes": [],
        "vlm": None
    }

if __name__ == "__main__":
    print("🚀 FireWatch Server (Single Frame Mode) is starting...")
    uvicorn.run(app, host="0.0.0.0", port=8000)