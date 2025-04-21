from flask import Flask, render_template

app = Flask(__name__)

users = ['Alice', 'Bob', 'Chaile', 'David', 'Eve']

@app.route('/')
def home():
    # return "<h1>헬로우</h1>"
    return render_template('index.html', name="John")

@app.route('/users')
def get_users():
    return render_template('users.html', users=users)

if __name__ == '__main__':
    app.run(port=3000, debug=True) # host="0.0.0.0",