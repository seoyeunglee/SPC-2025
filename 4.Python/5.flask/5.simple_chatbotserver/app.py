from flask import Flask, jsonify, request
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chatbot():
    data = request.get_json()
    message = data.get('question', '')
    # print(message)
    time.sleep(1) # 1초 있다가 답변이 오게
    return jsonify({'question': f'PYTHON: {message}'})

if __name__ == "__main__":
    app.run(debug=True)