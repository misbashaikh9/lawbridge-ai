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
    "category": "Cyber Law",
    "severity": "minor",
    "explanation": f"This falls under Cyber Law for: {data.question}",
    "steps": [
        "Collect all evidence",
        "Report to cyber crime portal",
        "Contact legal expert"
    ]
}