from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from pymongo import MongoClient
from PIL import Image
import numpy as np
import io
import os

app = FastAPI()

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MODEL PATH

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "emotion_model.h5"
)

# LOAD MODEL

model = load_model(
    MODEL_PATH,
    compile=False,
    safe_mode=False
)

# MONGODB ATLAS

client = MongoClient(
    "mongodb+srv://Laiba_khan:Laibanaaz1234@cluster0.839rxof.mongodb.net/?appName=Cluster0"
)

DB = client["emotion_ai"]

users_collection = DB["users"]

history_collection = DB["history"]

# EMOTIONS

emotions = [
    "Angry",
    "Disgust",
    "Fear",
    "Happy",
    "Neutral",
    "Sad",
    "Surprise"
]

# HOME ROUTE

@app.get("/")
def home():

    return {
        "status": "Backend Running Successfully"
    }

# SIGNUP

@app.post("/signup")
async def signup(data: dict):

    email = data["email"]

    user = users_collection.find_one({
        "email": email
    })

    if user:

        return {
            "message": "User already exists"
        }

    users_collection.insert_one({
        "email": data["email"],
        "password": data["password"]
    })

    return {
        "message": "Account Created"
    }

# LOGIN

@app.post("/login")
async def login(data: dict):

    user = users_collection.find_one({
        "email": data["email"],
        "password": data["password"]
    })

    if user:

        return {
            "message": "success"
        }

    return {
        "message": "invalid"
    }

# PREDICT EMOTION

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image_bytes = await file.read()

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("L")

    image = image.resize((48, 48))

    image = np.array(image).astype("float32") / 255.0

    image = image.reshape(1, 48, 48, 1)

    prediction = model.predict(image)

    confidence = float(np.max(prediction))

    label = emotions[np.argmax(prediction)]

    # SAVE HISTORY

    history_collection.insert_one({
        "emotion": label,
        "confidence": confidence
    })

    return {
        "emotion": label,
        "confidence": confidence
    }

# HISTORY

@app.get("/history")
def history():

    history_data = []

    data = history_collection.find()

    for item in data:

        history_data.append({
            "emotion": item["emotion"],
            "confidence": item["confidence"]
        })

    return history_data

# RUN SERVER

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )