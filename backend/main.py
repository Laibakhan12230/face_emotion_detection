from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from pymongo import MongoClient
from PIL import Image
import numpy as np
import io

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD MODEL
model = load_model("emotion_model.h5", compile=False)

# MONGODB
client = MongoClient("mongodb+srv://Laiba_khan:@Laibanaaz1234@cluster0.839rxof.mongodb.net/?appName=Cluster0")

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

# SIGNUP
@app.post("/signup")
async def signup(data: dict):

    email = data["email"]

    password = data["password"]

    user = users_collection.find_one({
        "email": email
    })

    if user:

        return {
            "message": "User already exists"
        }

    users_collection.insert_one({
        "email": email,
        "password": password
    })

    return {
        "message": "Account Created"
    }

# LOGIN
@app.post("/login")
async def login(data: dict):

    email = data["email"]

    password = data["password"]

    user = users_collection.find_one({
        "email": email,
        "password": password
    })

    if user:

        return {
            "message": "success"
        }

    return {
        "message": "invalid"
    }

# PREDICT
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image_bytes = await file.read()

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert('L')

    image = image.resize((48,48))

    image = np.array(image).astype("float32") / 255.0

    image = image.reshape(1,48,48,1)

    pred = model.predict(image)

    confidence = float(np.max(pred))

    label = emotions[np.argmax(pred)]

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
def get_history():

    history = []

    data = history_collection.find()

    for item in data:

        history.append({
            "emotion": item["emotion"],
            "confidence": item["confidence"]
        })

    return history
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10000)