import requests

url = 'https://jsonplaceholder.typicode.com/users'

response = requests.get(url)
users = response.json() # json으로 파싱해서 가져오기 
# print(response)
# print(users)

for user in users:
    # print(user)
    # print('-'*10)
    # print(user['name'])
    id = user['id']
    name = user['name']
    username = user['username']
    email = user['email']

    print(f"{id:<2} {name:30} {username:>20} {email:20}")