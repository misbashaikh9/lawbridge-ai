from fastapi import FastAPI
from pydantic import BaseModel
from model import predict_text

app = FastAPI()

class InputText(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "AI Service Running 🚀"}

@app.post("/predict")
def predict(data: InputText):
    category, severity = predict_text(data.text)

    return {
        "category": category,
        "severity": severity
    }