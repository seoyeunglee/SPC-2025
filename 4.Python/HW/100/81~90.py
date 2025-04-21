# 81
scores = [8.8, 8.9, 8.7, 9.2, 9.3, 9.7, 9.9, 9.5, 7.8, 9.4]

*valid_score, _, _ = scores
print(valid_score)

#82
scores = [8.8, 8.9, 8.7, 9.2, 9.3, 9.7, 9.9, 9.5, 7.8, 9.4]
a, b, *valid_score = scores
print(valid_score)

#83
scores = [8.8, 8.9, 8.7, 9.2, 9.3, 9.7, 9.9, 9.5, 7.8, 9.4]
a, *valid_score, b = scores
print(valid_score)

#84
temp = { }

#85
ice = {"메로나": 1000, "폴라포": 1200, "빵빠레": 1800}
print(ice)

#86
ice["죠스바"] = 1200
ice["월드콘"] = 1500
print(ice)

#87
print("메로나 가격: ",ice["메로나"])

#88
ice["메로나"] = 1300
print(ice)

#89
del ice["메로나"]
print(ice)

#90
