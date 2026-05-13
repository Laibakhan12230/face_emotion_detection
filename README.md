# 🎭 AI Emotion Detection System

A full-stack AI-powered web application that detects human emotions from facial images using Deep Learning.

🌐 **Live Demo:**
[https://face-emotion-detection-2ctt1r0hu-laibakhan12230s-projects.vercel.app/](https://face-emotion-detection-2ctt1r0hu-laibakhan12230s-projects.vercel.app/)

---

# 🚀 Features

* 🔐 User Signup & Login System
* 🧠 AI-Based Emotion Detection
* 📸 Upload Face Image for Prediction
* 📊 Emotion Confidence Score
* 🗂 Prediction History Storage
* ☁️ Fully Deployed Full-Stack Application
* 🌐 Frontend Hosted on Vercel
* ⚡ Backend Hosted on Render
* 🗄 MongoDB Atlas Database Integration

---

# 🧠 AI Model

The project uses a Convolutional Neural Network (CNN) trained on facial emotion datasets.

### Supported Emotions

* Angry 😠
* Disgust 🤢
* Fear 😨
* Happy 😄
* Neutral 😐
* Sad 😢
* Surprise 😲

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

## Backend

* FastAPI
* TensorFlow / Keras
* Pillow
* NumPy
* Uvicorn

## Database

* MongoDB Atlas

## Deployment

* Vercel (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```bash
face/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── final_emotion_model.h5
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone <your-repository-link>
cd face
```

---

# 🔧 Backend Setup

```bash
cd backend
```

## Create Virtual Environment

```bash
python -m venv tfenv
```

## Activate Environment

### Windows

```bash
tfenv\Scripts\activate
```

### Linux/Mac

```bash
source tfenv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run Backend

```bash
python main.py
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 📡 API Endpoints

## Home

```http
GET /
```

## Signup

```http
POST /signup
```

## Login

```http
POST /login
```

## Predict Emotion

```http
POST /predict
```

## History

```http
GET /history
```

---

# ☁️ Deployment

## Frontend Deployment

Hosted on:

* Vercel

## Backend Deployment

Hosted on:

* Render

## Database

Hosted on:

* MongoDB Atlas

---

# 📸 Screenshots

Add your project screenshots here.

---

# 🔮 Future Improvements

* 🎥 Real-Time Webcam Emotion Detection
* 📱 Mobile App Version
* 🔐 JWT Authentication
* 📄 PDF Report Download
* 📊 Analytics Dashboard
* 🤖 AI Chatbot Integration
* 📈 Advanced MLOps Pipeline

---

# 👩‍💻 Developer

### Laiba Khan

B.Tech Artificial Intelligence & Data Science Student

---

# ⭐ Project Status

✅ Completed & Successfully Deployed
