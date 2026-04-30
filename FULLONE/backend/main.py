
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pickle
# import numpy as np


# # تحميل النموذج
# with open("xgboost_youtube_balanced.pkl", "rb") as f:
#     model = pickle.load(f)

# app = FastAPI()

# # السماح للفرونت إند (Vite) إنه يتصل بالباك
# origins = [
#     "http://localhost:5173",  # Vite default
#     "http://127.0.0.1:5173",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # شكل البيانات الجاية من الفرونت إند (نفس المثال اللي أعطيتني إياه)
# class ManualInput(BaseModel):
#     title: str
#     country: str
#     description: str
#     language: str
#     tags_num: int


# class ManualOutput(BaseModel):
#     score: float        # 0–1 model probability
#     label: str          # Low / Medium / High
#     message: str


# def prepare_features(data: ManualInput):
#     """
#     TODO: هون بتحط تجهيز ال features الحقيقي
#     حسب الكود اللي عندك (نفس اللي استخدمته وقت التدريب).

#     الآن راح أرجع مثال dummy بس عشان يشتغل شكل الربط.
#     """

#     # مثال افتراضي: في العادة راح يكون عندك vectorizer / encoder...
#     # X = vectorizer.transform([...])
#     # بس عشان ما يكسر الكود، برجع vector بسيط بطول 5
#     title_len = len(data.title)
#     desc_len = len(data.description)
#     tags = data.tags_num

#     X = np.array([[title_len, desc_len, tags, 0, 0]], dtype=float)
#     return X


# def make_label(p: float) -> str:
#     if p >= 0.7:
#         return "High"
#     if p >= 0.4:
#         return "Medium"
#     return "Low"


# @app.post("/predict/manual", response_model=ManualOutput)
# def predict_manual(payload: ManualInput):
#     # تجهيز ال features
#     X = prepare_features(payload)

#     # لو النموذج XGBoost classifier غالباً عنده predict_proba
#     try:
#         proba = float(model.predict_proba(X)[0, 1])
#     except AttributeError:
#         # fallback: لو النموذج بيطلع predict بس
#         pred = float(model.predict(X)[0])
#         # نحاول نطبيعها كـ probability بين 0 و 1
#         proba = max(0.0, min(1.0, pred))

#     label = make_label(proba)

#     return ManualOutput(
#         score=proba,
#         label=label,
#         message="Model-estimated success probability for this video metadata.",
#     )

# main.py

from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from pydantic import BaseModel # type: ignore
import pickle
import numpy as np # type: ignore
import math


# ---------------- تحميل الموديل و الـ encoders ----------------

with open("xgboost_youtube_balanced.pkl", "rb") as f:
  model = pickle.load(f)

with open("label_encoders.pkl", "rb") as f:
  encoders = pickle.load(f)
  le_country = encoders["country"]
  # ملاحظة: الاسم في ملفك "langauge" بنفس الغلط الإملائي
  le_language = encoders["langauge"]


# ---------------- إعداد FastAPI + CORS ----------------

app = FastAPI()

# خليها مفتوحة لكل الـ origins حالياً عشان ما يصير CORS error
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=False,
  allow_methods=["*"],
  allow_headers=["*"],
)


# ---------------- نماذج الـ Request / Response ----------------

class ManualInput(BaseModel):
  title: str
  country: str
  description: str
  language: str
  tags_num: int  # من الفرونت


class ManualOutput(BaseModel):
  score: float          # 0–1
  label: str            # Low / Medium / High
  message: str
  predicted_views: float | None = None  # اختيارية لو حبيت تستعملها لاحقاً


# ---------------- تجهيز الـ features كما في Flask القديم ----------------

def safe_label_encode(le, value: str) -> int:
  """ترميز آمن: لو القيمة مش موجودة في الـ encoder نرجّع أول class."""
  if value in le.classes_:
    return int(le.transform([value])[0])
  return int(le.transform([le.classes_[0]])[0])


def prepare_features(data: ManualInput) -> np.ndarray:
  """
  نفس منطق الميزات اللي كنت كاتبه في app.py (Flask):

  country_encoded, language_encoded, tags, title_length, desc_length,
  title_words, desc_words, title_length / (desc_length + 1),
  title_length / (title_words + 1),
  desc_length / (desc_words + 1),
  has_description,
  desc_words / (desc_length + 1),
  tags / (title_words + 1),
  total_text_length,
  total_word_count
  """

  title = data.title or ""
  country = data.country or ""
  description = data.description or ""
  language = data.language or ""
  tags = max(0, int(data.tags_num))

  # أطوال النص
  title_length = len(title)
  desc_length = len(description)

  # عدد الكلمات
  title_words_list = [w for w in title.split() if w]
  desc_words_list = [w for w in description.split() if w]

  title_words = len(title_words_list)
  desc_words = len(desc_words_list)

  # ترميز country / language
  country_encoded = safe_label_encode(le_country, country)
  language_encoded = safe_label_encode(le_language, language)

  # مشتقات إضافية
  ratio_title_desc_chars = title_length / (desc_length + 1)
  ratio_title_words = title_length / (title_words + 1)
  ratio_desc_words = (
    desc_length / (desc_words + 1) if desc_words > 0 else 0.0
  )
  has_description = 1 if desc_length > 0 else 0
  desc_quality = (
    desc_words / (desc_length + 1) if desc_length > 0 else 0.0
  )
  tags_per_title_word = tags / (title_words + 1)
  total_text_length = title_length + desc_length
  total_word_count = title_words + desc_words

  features = np.array(
    [
      [
        country_encoded,
        language_encoded,
        tags,
        title_length,
        desc_length,
        title_words,
        desc_words,
        ratio_title_desc_chars,
        ratio_title_words,
        ratio_desc_words,
        has_description,
        desc_quality,
        tags_per_title_word,
        total_text_length,
        total_word_count,
      ]
    ],
    dtype=float,
  )

  return features


def views_to_score(predicted_views: float) -> float:
  """
  نحول عدد المشاهدات المتوقع إلى رقم بين 0 و 1 بطريقة منطقية.
  نستخدم log-scale على أساس أن 1,000,000 view ≈ score 1.0
  عدّل الرقم لو توزيع بياناتك مختلف.
  """
  v = max(predicted_views, 0.0)
  score_raw = math.log1p(v) / math.log1p(1_000_000.0)
  score = max(0.0, min(1.0, score_raw))
  return float(score)


def make_label(score: float) -> str:
  if score >= 0.7:
    return "High"
  if score >= 0.4:
    return "Medium"
  return "Low"


# ---------------- Endpoint الرئيسي ----------------

@app.post("/predict/manual", response_model=ManualOutput)
def predict_manual(payload: ManualInput):
  X = prepare_features(payload)

  # الموديل هنا XGBoost Regressor (يتوقع المشاهدات)
  predicted_views = float(model.predict(X)[0])

  score = views_to_score(predicted_views)
  label = make_label(score)

  msg = (
    f"Model predicts around {predicted_views:,.0f} expected views "
    f"for this video’s metadata."
  )

  return ManualOutput(
    score=score,
    label=label,
    message=msg,
    predicted_views=predicted_views,
  )


# (اختياري) Route بسيط عشان تتأكد إن السيرفر شغال
@app.get("/")
def root():
  return {"status": "ok", "message": "YouTube model backend is running."}
