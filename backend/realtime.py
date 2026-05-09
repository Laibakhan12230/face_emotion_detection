import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load Model
model = load_model("emotion_model.h5")

# IMPORTANT:
# Change according to printed class_indices
emotions = [
    "Angry",
    "Disgust",
    "Fear",
    "Happy",
    "Neutral",
    "Sad",
    "Surprise"
]

# Load Haarcascade
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

# Open Webcam
cap = cv2.VideoCapture(0)

while True:

    ret, frame = cap.read()

    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.3,
        minNeighbors=5
    )

    for (x, y, w, h) in faces:

        # Better Face Crop
        padding = 10

        x1 = max(x - padding, 0)
        y1 = max(y - padding, 0)
        x2 = min(x + w + padding, gray.shape[1])
        y2 = min(y + h + padding, gray.shape[0])

        face = gray[y1:y2, x1:x2]

        # Resize
        face = cv2.resize(face, (48,48))

        # Normalize
        face = face.astype("float32") / 255.0

        # Reshape
        face = face.reshape(1,48,48,1)

        # Prediction
        pred = model.predict(face, verbose=0)

        confidence = np.max(pred)

        label = emotions[np.argmax(pred)]

        # Draw Rectangle
        cv2.rectangle(
            frame,
            (x,y),
            (x+w,y+h),
            (0,255,0),
            2
        )

        # Put Text
        text = f"{label} ({confidence:.2f})"

        cv2.putText(
            frame,
            text,
            (x, y-10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0,255,0),
            2
        )

    cv2.imshow("Emotion Detector", frame)

    # ESC key to exit
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()