#51
movie_rank = ["닥터 스트레인지", "스플릿", "럭키"]
print(movie_rank)

#52
movie_rank.append("배트맨")
print(movie_rank)

#53
movie_rank.insert(1, "슈퍼맨")
print(movie_rank)

#54
del movie_rank[3]
print(movie_rank)

#55
del movie_rank[2]
del movie_rank[2]
print(movie_rank)

#56
lang1 = ["C", "C++", "JAVA"]
lang2 = ["Python", "Go", "C#"]
langs = lang1 + lang2
print(langs)

#57
nums = [1, 2, 3, 4, 5, 6, 7]
print(max(nums))
print(min(nums))

#58
nums = [1, 2, 3, 4, 5]
print(sum(nums))

#59
cook = ["피자", "김밥", "만두", "양념치킨", "족발", "피자", "김치만두", "쫄면", "소시지", "라면", "팥빙수", "김치전"]
print(len(cook))

#60
nums = [1, 2, 3, 4, 5]
print(sum(nums)/len(nums))