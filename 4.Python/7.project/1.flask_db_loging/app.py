import sqlite3
from flask import Flask, send_from_directory, request

app = Flask(__name__)

conn = sqlite3.connect('users.db', check_same_thread=False)
cur = conn.cursor()

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/login', methods=["POST"])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    cur.execute('SELECT * FROM users WHERE username=? AND password=?', (username, password))
    user = cur.fetchone()
    return 'OK'
    conn.close()

    if user:
        return '성공'
    else:
        return '실패'

if __name__ == "__main__":
    app.run(debug=True)
