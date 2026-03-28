from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="LawBridge AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    text: str


class AnalyzeResponse(BaseModel):
    category: str
    severity: str
    explanation: str
    steps: list[str]


LEGAL_CATEGORIES = [
    "Labour Law",
    "Consumer Law",
    "Property Law",
    "Cyber Law",
    "Criminal Law",
]


@app.get("/")
def root():
    return {"message": "LawBridge AI Service is running"}


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_query(req: QueryRequest):
    """
    Dummy /analyze endpoint.
    Accepts a legal query and returns a mock classification + guidance.
    Will be replaced with real NLP models later.
    """
    text_lower = req.text.lower()

    # Simple keyword-based dummy classification
    if any(w in text_lower for w in ["salary", "fired", "employer", "worker", "labour", "wages"]):
        category = "Labour Law"
    elif any(w in text_lower for w in ["refund", "product", "consumer", "defective", "warranty"]):
        category = "Consumer Law"
    elif any(w in text_lower for w in ["property", "land", "rent", "tenant", "landlord"]):
        category = "Property Law"
    elif any(w in text_lower for w in ["hack", "cyber", "online", "fraud", "scam", "data"]):
        category = "Cyber Law"
    elif any(w in text_lower for w in ["theft", "assault", "murder", "crime", "police"]):
        category = "Criminal Law"
    else:
        category = "General Legal"

    # Dummy severity
    if any(w in text_lower for w in ["murder", "assault", "arrest", "threat", "serious"]):
        severity = "serious"
    else:
        severity = "minor"

    # Dummy response
    if severity == "serious":
        explanation = f"Your issue falls under {category}. This appears to be a serious matter that requires professional legal assistance."
        steps = [
            "Document all evidence related to your case",
            "File a police report if not already done",
            "Consult a lawyer specializing in " + category,
            "Do not discuss the case publicly",
        ]
    else:
        explanation = f"Your issue falls under {category}. This appears to be a minor issue that can likely be resolved with proper guidance."
        steps = [
            "Gather all relevant documents and records",
            "Write a formal complaint to the concerned authority",
            "Follow up within 7-14 days",
            "If unresolved, consider legal consultation",
        ]

    return AnalyzeResponse(
        category=category,
        severity=severity,
        explanation=explanation,
        steps=steps,
    )


if __name__ == "__main__":
    import os, uvicorn
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
