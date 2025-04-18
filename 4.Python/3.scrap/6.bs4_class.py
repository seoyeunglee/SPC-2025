# pip install bs4
# pip install beautifulsoup4

from bs4 import BeautifulSoup

html_doc = """
<html>
<head>
    <title>간단한 HTML 예제</title>
</head>
<body>
<div class="container">
    <h1>안녕하세요</h1>
    <p>이것은 간단한 HTML 예제입니다</p>
    </div>
    <ul>
        <li>항목 1</li>
        <li>항목 2</li>
        <li>항목 3</li>
    </ul>
    <div class="footer">
        <p id="copyright">저작권 copyright 2025.</p>
    </div>
</body>
</html>
"""

soup = BeautifulSoup(html_doc,'html.parser')

container_div = soup.find('div', class_='container')
print(container_div)
print(container_div.h1)
print(container_div.h1.text)

footer_div = soup.find('div', class_='footer')
print(footer_div.p.text)

copyright = soup.find("p", id="copyright")
print(copyright.text)