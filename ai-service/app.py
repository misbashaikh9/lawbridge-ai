from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_text
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
You are LawBridge AI, an expert Indian legal assistant.

A user has submitted this legal problem:
"{question}"

Our system has already classified it as:
- Legal Category: {category}
- Severity: {severity}

Generate a complete legal guidance response in EXACTLY this format.
Do not skip any section. Do not add anything before or after.

2. YOUR SCENARIO
Problem:
"{question}"

3. WHICH LAW APPLIES?
Category:
{category}

Relevant Indian Laws:
[List 3 to 4 relevant Indian acts with year]

4. IMPORTANT RULE YOU SHOULD KNOW
[Name of the key rule]
[Explain the rule in 2 to 3 simple sentences for a non-lawyer Indian citizen]
So:
[What is illegal in this situation — one line]

5. WHAT YOU SHOULD DO (STEPS)
Step 1: [Title]
[What to do — 1 to 2 lines]
Step 2: [Title]
[What to do — 1 to 2 lines]
Step 3: [Title]
[What to do — 1 to 2 lines]
Step 4: [Title]
[What to do — 1 to 2 lines]

6. WHEN IS THIS SERIOUS?
Your case becomes SERIOUS if:
[3 conditions that make it serious — one per line]
Then:
[What the user should do if serious — one line]

Keep language very simple. Write for a non-lawyer Indian citizen.
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

        return {
            "category":      category,
            "severity":      severity,
            "full_response": full_response,
        }

    except RuntimeError as e:
        print(f"Groq error: {e}")
        return {"error": str(e)}

    except Exception as e:
        print(f"ERROR: {e}")
        return {"error": str(e)}