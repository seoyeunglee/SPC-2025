# https://sports.news.naver.com/index

import requests
from bs4 import BeautifulSoup

url = 'https://sports.news.naver.com/index'

response = requests.get(url)
sport = response.text
# print(sport)

soup = BeautifulSoup(sport, 'html.parser')
# print(soup)

news = soup.select('.today_list > li')
# print(news)

for n in news:
    a_tag = n.select_one('a')
    # print(a_tag['title'].strip())
    # break
    strong = n.select_one('strong')
    print(strong.text)

    news_detail_url = a_tag['href']
    print(news_detail_url)


    news_detail = requests.get(news_detail_url)
    soup = BeautifulSoup(news_detail.text, 'html.parser')
    print(soup)

    article = soup.select('#comp_news_article')
    print('유레카!!:',article)
    detail_content = article.select('span').text

    print(a_tag['href'])


# 해당 뉴스기사 페이지의 상세내용
# 긴 기사 내용의 100 정도 길이 



# 추천뉴스 섹션 
