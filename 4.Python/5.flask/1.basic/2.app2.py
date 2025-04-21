from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

users = [
    {'id': 1, 'name': 'Alice', 'age':25, 'phone':'123-456-7890'},
    {'id': 2, 'name': 'Bob', 'age':30, 'phone':'222-456-7890'},
    {'id': 3, 'name': 'Chaile', 'age':35, 'phone':'333-456-7890'},
    {'id': 4, 'name': 'Alice', 'age':35, 'phone':'444-456-7890'},
]

@app.route('/')
def main():
    return "메인"

@app.route('/users')
def get_users():
    return jsonify(users)

@app.route('/users/<int:user_id>')
def get_user_by_id(user_id):
    # user = None
    # for u in users:
    #     if u['id'] == user_id:
    #         user = u
    #         break #  찾았으면 중단하는게 효율적인 코드 

    # 위에 있는 5줄 코드 한줄로
    user = next((user for user in users if user['id'] == user_id),None)

    if user is not None:
        return jsonify(user)
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/search') # /search?name=Alice
def search_user():
    query = request.args.get('name')
    if not query:
        data = {'error' : '이름은필수기재해주세요'}
        response = make_response(jsonify(data))
        response.headers["Content-Type"] = "application/json; charset=utf-8"
        return response
    
    results = [user for user in users if query.lower() in user['name'].lower()]
    return jsonify(results)

if __name__ == "__main__":
    app.run()