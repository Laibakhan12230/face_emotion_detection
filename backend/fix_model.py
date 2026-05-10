from tensorflow.keras.models import load_model

model = load_model("emotion_model.h5", compile=False)

model.save("emotion_model_fixed.h5")

print("MODEL FIXED SUCCESSFULLY")