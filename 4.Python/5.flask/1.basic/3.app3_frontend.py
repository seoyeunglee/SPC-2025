from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # return "<h1>헬로우</h1>"
    return render_template('index.html', name="John")

if __name__ == '__main__':
    app.run()