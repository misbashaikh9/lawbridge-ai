import joblib

vectorizer = joblib.load("vectorizer.pkl")
category_model = joblib.load("category_model.pkl")
severity_model = joblib.load("severity_model.pkl")

def predict_text(text):
    X = vectorizer.transform([text])

    category = category_model.predict(X)[0]
    severity = severity_model.predict(X)[0]

    return category, severity