import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

data = pd.read_csv("data.csv")

texts = data["text"]

# Convert text to numbers
vectorizer = TfidfVectorizer(
    lowercase=True,
    stop_words="english",
    ngram_range=(1,2)
)
X = vectorizer.fit_transform(texts)

# Train category model
category_model = MultinomialNB()
category_model.fit(X, data["category"])

# Train severity model
severity_model = MultinomialNB()
severity_model.fit(X, data["severity"])

# Save models
joblib.dump(vectorizer, open("vectorizer.pkl","wb"))
joblib.dump(category_model, open("category_model.pkl","wb"))
joblib.dump(severity_model, open("severity_model.pkl","wb"))

print("Models trained and saved!")
