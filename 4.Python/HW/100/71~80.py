#71
my_variable = ()
print(type(my_variable))

#72
movie_rank = ("닥터 스트레인지", "스플릿", "럭키")

#73
my_tuple = (1,0)

#74
# >> t = (1, 2, 3)
# >> t[0] = 'a'
# Traceback (most recent call last):
#   File "<pyshell#46>", line 1, in <module>
#     t[0] = 'a'
# TypeError: 'tuple' object does not support item assignment

#75
t = 1,2,3,4

#76
t = ('a', 'b', 'c')
t = ('A', 'b', 'c')

#77
interest = ('삼성전자', 'LG전자', 'SK Hynix')
data = list(interest)
print(data)

#78
interest = ['삼성전자', 'LG전자', 'SK Hynix']
data = tuple(interest)
print(data)

#79
temp = ('apple', 'banana', 'cake')
a, b, c = temp
print(a, b, c)

#80
data = tuple(range(2, 100, 2))
print( data )

