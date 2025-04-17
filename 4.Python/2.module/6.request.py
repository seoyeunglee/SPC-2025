# pip install requests

import requests

# 네이버 주세요 ~
resp = requests.get("https://ww.naver.com")
print("웹 페이지 내용:",resp)
print("헤더정보:",resp.headers)
print("바디정보는?:",resp.text)
