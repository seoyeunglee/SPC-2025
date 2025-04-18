# 네이버 검색 API 예제 - 블로그 검색
import os
import sys
import urllib.request
import json
from dotenv import load_dotenv

# .env 를 읽어서 해당 내용을 이 프로세스의 환경변수에 저장 
load_dotenv()

client_id = os.getenv("NAVER_CLIENT_ID")
client_secret = os.getenv("NAVER_CLIENT_SECRET")
encText = urllib.parse.quote("감자")
url = "https://openapi.naver.com/v1/search/blog?query=" + encText + "&start=11&display=5"# JSON 결과
# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
response = urllib.request.urlopen(request)
rescode = response.getcode()

if(rescode==200):
    response_body = response.read()
    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)


