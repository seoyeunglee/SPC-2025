import random

print("랜덤 숫자: ", random.randint(1, 100))

# 미션. 
def roll_dice():
    return random.randint(1,6)

print("주사위 던진 결과: ", roll_dice())
