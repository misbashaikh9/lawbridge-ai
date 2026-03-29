from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Query(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "AI Service Running 🚀"}

@app.post("/analyze")
def analyze(data: Query):
    return {
    "debug": "THIS IS NEW VERSION 🔥"
}