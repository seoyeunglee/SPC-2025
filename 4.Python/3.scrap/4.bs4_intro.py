# pip install bs4
# pip install beautifulsoup4

from bs4 import BeautifulSoup

html_doc = """
<html>
<head>
    <title>간단한 HTML 예제</title>
</head>
<body>
    <h1>안녕하세요</h1>
    <p>이것은 간단한 HTML 예제입니다</p>
</body>
</html>
"""

soup = BeautifulSoup(html_doc,'html.parser')
print(soup)
print('-'*10)
print(html_doc) # 같아보이지만 자료구조가 다르다 !!! 

print(html_doc.title) # 안됨
print(soup.title) # 됨

print(soup.h1)
print(soup.h1.text)
print(soup.p)
print(soup.p.text)