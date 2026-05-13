from tensorflow.keras.models import load_model

model = load_model("emotion_saved_model.keras", compile=False)

model.save("emotion_model.h5")