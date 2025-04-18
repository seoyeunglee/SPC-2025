import requests

url = 'https://example.com'

response = requests.get(url)
data = response.text

# html이 아니고 문자열.. string 자료구조 
print(data)