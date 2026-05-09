import gradio as gr
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image

# Load trained model
model = load_model("emotion_model.h5")

# Emotion labels
emotions = [
    "Angry",
    "Disgust",
    "Fear",
    "Happy",
    "Neutral",
    "Sad",
    "Surprise"
]

# Emotion Emojis
emoji_map = {
    "Angry": "😠",
    "Disgust": "🤢",
    "Fear": "😨",
    "Happy": "😄",
    "Neutral": "😐",
    "Sad": "😢",
    "Surprise": "😲"
}

# Prediction Function
def predict(img):

    img = img.convert('L')
    img = img.resize((48,48))

    img = np.array(img).astype("float32") / 255.0
    img = img.reshape(1,48,48,1)

    pred = model.predict(img, verbose=0)

    confidence = float(np.max(pred))

    label = emotions[np.argmax(pred)]

    emoji = emoji_map[label]

    result = f"""
    <div class='result-card'>
        <h1>{emoji}</h1>
        <h2>{label}</h2>
        <p>Confidence: {confidence:.2%}</p>
    </div>
    """

    chart = {
        emotions[i]: float(pred[0][i])
        for i in range(len(emotions))
    }

    return result, chart


# Custom CSS
css = """
body {
    background: linear-gradient(135deg, #0f172a, #1e293b);
}

.gradio-container {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    font-family: 'Poppins', sans-serif;
}

.main-title {
    text-align: center;
    font-size: 50px;
    font-weight: 700;
    color: white;
    margin-bottom: 10px;
    animation: glow 2s infinite alternate;
}

.subtitle {
    text-align: center;
    color: #cbd5e1;
    margin-bottom: 30px;
    font-size: 18px;
}

.result-card {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 25px;
    text-align: center;
    color: white;
    animation: fadeIn 0.8s ease-in-out;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.result-card h1 {
    font-size: 70px;
    margin-bottom: 10px;
}

.result-card h2 {
    font-size: 35px;
    margin-bottom: 10px;
}

.result-card p {
    font-size: 20px;
    color: #94a3b8;
}

button {
    background: linear-gradient(90deg, #3b82f6, #8b5cf6) !important;
    color: white !important;
    border: none !important;
    border-radius: 14px !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    transition: 0.3s ease !important;
}

button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px #3b82f6;
}

.image-frame {
    border-radius: 20px;
    overflow: hidden;
    border: 2px solid rgba(255,255,255,0.15);
}

@keyframes glow {
    from {
        text-shadow: 0 0 10px #3b82f6;
    }
    to {
        text-shadow: 0 0 25px #8b5cf6;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}
"""

# UI Layout
with gr.Blocks(css=css, theme=gr.themes.Soft()) as demo:

    gr.HTML("""
        <div class='main-title'>
            AI Emotion Detection System
        </div>
    """)

    gr.HTML("""
        <div class='subtitle'>
            Upload a face image and detect emotions using Deep Learning
        </div>
    """)

    with gr.Row():

        with gr.Column(scale=1):

            image_input = gr.Image(
                type="pil",
                label="Upload Face Image",
                elem_classes="image-frame"
            )

            predict_btn = gr.Button("Detect Emotion 🚀")

        with gr.Column(scale=1):

            output_html = gr.HTML()

            label_chart = gr.Label(
                num_top_classes=7,
                label="Prediction Probabilities"
            )

    predict_btn.click(
        fn=predict,
        inputs=image_input,
        outputs=[output_html, label_chart]
    )

# Launch App
demo.launch()