print('hello, python')

x=5
y=3
str = "Hello, World!"

print("덧셈:",x+y)
print("뺄셈:",x-y)
print("곱셈:",x*y)
print("나눗셈:",x/y)

print("덧셈: {x} + {y}")
print(f"덧셈: {x} + {y}")

print(str.lower())
# print(x.lower())
print(str.upper())

# strip() ... 함수 살펴보기 

s = "apple, banana, cherry"
s_list = s.split(",")
print(s)
print(s_list)
print(s_list[0])
print(s_list[1])
print(s_list[2])
# print(s_list[3]) # IndexError: list index out of range

