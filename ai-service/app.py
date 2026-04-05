from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_text
import joblib

# Load lawyer data at startup
try:
    lawyers = joblib.load("lawyers.pkl")
except Exception as e:
    print(f"Could not load lawyers.pkl: {e}")
    lawyers = []
# ── Prompt builder ─────────────────────────────────────────────────────────────
def recommend_lawyers(category, top_n=3):
    # Filter lawyers by specialization/category
    filtered = [l for l in lawyers if l["specialization"].strip().lower() == category.strip().lower()]
    # Sort by rating (desc), then experience (desc)
    filtered.sort(key=lambda l: (float(l["rating"]), int(l["experience"])), reverse=True)
    return filtered[:top_n]
import os
from pathlib import Path
import requests
from dotenv import load_dotenv

# Load ai-service/.env first, then repo backend/.env (Groq key often lives with Node env).
_root = Path(__file__).resolve().parent
load_dotenv(_root / ".env")
load_dotenv(_root.parent / "backend" / ".env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq: use env vars. Model llama3-70b-8192 was retired — use a current ID (see Groq docs).
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")


# ── Request body ───────────────────────────────────────────────────────────────
class InputText(BaseModel):
    text: str


# ── Prompt builder ─────────────────────────────────────────────────────────────
def build_prompt(question: str, category: str, severity: str) -> str:
    return f"""
You are a professional Indian legal assistant.

Analyze the user's issue and respond in a clear, structured, and professional format.

STRICT INSTRUCTIONS:
- Use simple English suitable for a common Indian citizen
- Do NOT use emojis
- Do NOT write long paragraphs
- Use clear section headings (ALL CAPS)
- Use round bullet points (●)
- Keep responses concise and actionable
- Always follow the exact format below

User Problem:
"{question}"

Predicted Category: {category}
Predicted Severity: {severity}

FORMAT:

CASE UNDERSTANDING
This appears to be related to:
● {category}

RELEVANT INDIAN LAWS
● [Law Name with Year]
● [Law Name with Year]
● [Law Name with Year]

IMPORTANT RULE YOU SHOULD KNOW
[Rule Name]
[Explain in 2–3 simple sentences for a non-lawyer Indian citizen]

WHAT IS ILLEGAL IN THIS SITUATION
● [One clear sentence]

WHAT YOU SHOULD DO

Step 1: [Short Title]  
[1–2 line explanation]

Step 2: [Short Title]  
[1–2 line explanation]

Step 3: [Short Title]  
[1–2 line explanation]

Step 4: [Short Title]  
[1–2 line explanation]

WHEN IS THIS SERIOUS

Your case becomes serious if:
● [Condition 1]
● [Condition 2]
● [Condition 3]

IF THE MATTER IS SERIOUS
● [Immediate action advice]

IMPORTANT:
- Never skip any section
- Never merge sections
- Always keep formatting consistent
- Avoid legal jargon unless necessary
""".strip()


# ── Groq API call ──────────────────────────────────────────────────────────────
def call_groq(prompt: str) -> str:
    api_key = os.getenv("GROQ_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not set (add it to ai-service/.env or the environment).")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are LawBridge AI, a professional Indian legal assistant. "
                    "Always respond in the exact structured format requested. "
                    "Use plain English. Do not use markdown or asterisks."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.4,
        "max_tokens": 1200,
    }

    response = requests.post(GROQ_URL, headers=headers, json=payload, timeout=60)
    if not response.ok:
        try:
            detail = response.json()
        except Exception:
            detail = response.text
        raise RuntimeError(f"Groq API {response.status_code}: {detail}")
    return response.json()["choices"][0]["message"]["content"]


# ── Routes ─────────────────────────────────────────────────────────────────────
@app.get("/")
def home():
    return {"message": "LawBridge AI Service Running"}


@app.get("/warmup")
def warmup():
    return {"status": "AI is ready"}


@app.post("/predict")
def predict(data: InputText):
    try:
        print(f"Incoming: {data.text}")

        # Step 1 — sklearn classifies category and severity (your existing models)
        category, severity = predict_text(data.text)
        print(f"Category: {category} | Severity: {severity}")

        # Step 2 — Groq generates rich explanation using classification
        prompt        = build_prompt(data.text, category, severity)
        full_response = call_groq(prompt)
        print("Groq response received.")


        # Step 3 — Recommend lawyers if severity is serious
        lawyer_recommendations = []
        if severity.strip().lower() == "serious":
            lawyer_recommendations = recommend_lawyers(category)

        return {
            "category":      category,
            "severity":      severity,
            "full_response": full_response,
            "lawyers":       lawyer_recommendations,
        }

    except RuntimeError as e:
        print(f"Groq error: {e}")
        return {"error": str(e)}

    except Exception as e:
        print(f"ERROR: {e}")
        return {"error": str(e)}