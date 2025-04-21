from flask import Flask, jsonify, request
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chatbot():
    data = request.get_json()
    message = data.get('question', '')
    if "배고파" in message:
        reply_msg = "나도"
    elif "집에갈래" in message:
        reply_msg = "가지마"
    else:
        reply_msg = message
    # print(message)
    time.sleep(1) # 1초 있다가 답변이 오게
    return jsonify({'question': f'PYTHON: {reply_msg}'})

if __name__ == "__main__":
    app.run(debug=True)