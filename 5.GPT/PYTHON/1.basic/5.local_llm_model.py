# pip install transformers protobuf sentencepiece torch

# ~/.cache/hugginface 디렉토리 안에 모델들이 다운로드가 됨..

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv

from flask import Flask, request, jsonify

load_dotenv(dotenv_path='../.env')

app = Flask(__name__)

# model_name = "mistralai/Mistral-7B-Instruct-v0.3"
model_name = "gpt2"

# 모델 불러오기
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto")

# 파이프라인 생성
generator = pipeline(
    "text-generation",
      model=model, 
      tokenizer=tokenizer,
      temperature=0.7, 
      max_new_tokens=128,
      pad_token_id=tokenizer.eos_token_id,
      do_sample=True,
      top_k=50,
      top_p=0.95,
      repetition_penalty=1.2,
      no_repeat_ngram_size=3,
)

# 질문~
# prompt = "What are good fitness tips?"
# outputs = generator(prompt)
# print(outputs[0]["generated_text"])

@app.route("/genderate", methods=["POST"])
def generate():
    data = request.json
    prompt = data.get("prompt", "").strip()

    if not prompt:
        return jsonify({"error": "프롬프트를 입력하세요"}), 400
    
    result = generator(prompt)
    return jsonify({"response": result[0]["generated_text"]})

if __name__ == "__main__":
    app.run(port=5000)
