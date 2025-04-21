# 41
ticker = "btc_krw"
ticker1 = ticker.upper()
print(ticker1)

# 42
ticker = "BTC_KRW"
ticker = ticker.lower()
print(ticker)

# 43
a = "hello"
a = a.capitalize()
print(a)

# 44
file_name = "보고서.xlsx"
print(file_name.endswith("xlsx"))

# 45
file_name = "보고서.xlsx"
print(file_name.endswith(("xlsx", "xls")))

# 46
file_name = "2020_보고서.xlsx"
print(file_name.startswith("2020"))

# 47
a = "hello world"
print(a.split())

# 48
ticker = "btc_krw"
print(ticker.split("_"))

# 49
date = "2020-05-01"
print(date.split("-"))

# 50
data = "039490     "
print(data.rstrip())
