# pip install selenium
# pip install webdriver_manager

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

from bs4 import BeautifulSoup

import time
import csv

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

driver.get('https://www.naver.com')

search_box = driver.find_element(By.NAME, 'query')
search_box.send_keys("Python programming")
search_box.submit()

time.sleep(5)

books_div = driver.find_element(By.CSS_SELECTOR, '#main_pack > section.sc_new.sp_nbook._prs_bok_lst._slog_visible > div.api_subject_bx._nshopping_book_pc > div.book_list_wrap._book_content_root > div > ul > li:nth-child(1) > a')
print(books_div)

# a_tags = books_div.select("a.item_title")

my_book_list = []

for book in a_tags:
    title = book.text.strip()
    link = book.get("href")
    my_book_list.append([title, link])

print(my_book_list)

# for idx, item in enumerate(books, 1):
#     print(f"{idx}. {item.text}")



# driver.save_screenshot('search_results.png')

# driver.quit()

with open("naver_books.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(['제목', '링크'])
    writer.writerows(my_book_list)