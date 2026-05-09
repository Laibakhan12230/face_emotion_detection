import cv2
import os

input_folder = "dataset"
output_folder = "processed_dataset"

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

os.makedirs(output_folder, exist_ok=True)

count = 0

for emotion in os.listdir(input_folder):

    emotion_path = os.path.join(input_folder, emotion)

    if not os.path.isdir(emotion_path):
        continue

    save_emotion_path = os.path.join(output_folder, emotion)
    os.makedirs(save_emotion_path, exist_ok=True)

    print(f"\nProcessing {emotion} images...")

    for img_name in os.listdir(emotion_path):

        img_path = os.path.join(emotion_path, img_name)

        img = cv2.imread(img_path)

        if img is None:
            continue

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=5
        )

        for (x, y, w, h) in faces:

            padding = 10

            x1 = max(x-padding, 0)
            y1 = max(y-padding, 0)
            x2 = min(x+w+padding, gray.shape[1])
            y2 = min(y+h+padding, gray.shape[0])

            face = gray[y1:y2, x1:x2]

            face = cv2.resize(face, (48,48))

            save_path = os.path.join(save_emotion_path, img_name)

            cv2.imwrite(save_path, face)

            count += 1

            if count % 100 == 0:
                print(f"{count} images processed...")

print("\n✅ Face Cropping Completed")