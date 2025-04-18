# https://www.pythonscraping.com/pages/page3.html

import requests
from bs4 import BeautifulSoup

url = "https://www.pythonscraping.com/pages/page3.html"

response = requests.get(url)
page3 = response.text

# print(page3)

soup = BeautifulSoup(page3, 'html.parser')
# print(soup)

# class_gift = soup.find_all('tr', class_="gift")
# print(class_gift)

# for td in class_gift:
#     print(td.text)

##################################################

# gifts = soup.find_all('tr')
# print(gifts)

# for g in gifts:
#     # print(g)
#     # td = g.find('td')
#     tds = g.select('td')
#     if len(tds) > 0:
#         print(tds[0].text.strip(), tds[2].text.strip())

###################################################

gifts = soup.select('#giftList > tr')
# print(len(gifts))

for g in gifts:
    tds = g.select('td')
    if (len(tds) > 0):
        title = tds[0].text.strip()
        price = tds[2].text.strip()

        print(f"상품명: {title:30} 가격: {price:20}")

        