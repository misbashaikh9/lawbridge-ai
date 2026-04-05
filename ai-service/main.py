import pandas as pd
from sklearn.pipeline import FeatureUnion
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

data = pd.read_csv("data.csv")

texts = data["text"]

# Combine word features with character features so the model is less fragile
# when users type short, misspelled, or informal queries.
vectorizer = FeatureUnion([
    (
        "word",
        TfidfVectorizer(
            lowercase=True,
            stop_words="english",
            ngram_range=(1, 2),
            sublinear_tf=True,
        ),
    ),
    (
        "char",
        TfidfVectorizer(
            lowercase=True,
            analyzer="char_wb",
            ngram_range=(3, 5),
            sublinear_tf=True,
        ),
    ),
])

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

# Load lawyer.csv
lawyer_df = pd.read_csv("lawyer.csv", header=None, names=[
    "name", "specialization", "location", "experience", "rating", "fees", "cases", "qualification", "contact"
])

# Convert to list of dicts
lawyer_list = lawyer_df.to_dict(orient="records")

# Save as pickle
joblib.dump(lawyer_list, open("lawyers.pkl", "wb"))

print("Lawyer data processed and saved as lawyers.pkl!")