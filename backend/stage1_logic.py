import cv2
import numpy as np
from ultralytics import YOLO

try:
    fire_model = YOLO("fire_smoke.pt")
    print("✅ Stage 1: Fire & Smoke YOLO model loaded.")
except Exception as e:
    print(f"❌ Stage 1: Error loading fire model: {e}")

def detect_fire_stage1(frame):
    results = fire_model(frame, conf=0.45, verbose=False)[0]
    
    bboxes = []
    if len(results.boxes) > 0:
        bboxes = results.boxes.xyxy.cpu().numpy().astype(int).tolist()
    
    return bboxes