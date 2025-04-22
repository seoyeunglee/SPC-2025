import sqlite3

conn = sqlite3.connect('users.db')
cur = conn.cursor()

# cur.execute('''
#     CREATE TABLE users(
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             name TEXT,
#             age INTEGER
#     )
# ''')

cur.execute('SELECT COUNT(*) FROM users')
count = cur.fetchone()[0]
# print(count)

if count == 0:
    cur.execute('INSERT INTO users (name, age) VALUES (?, ?)',('Alice', 30))
    cur.execute('INSERT INTO users (name, age) VALUES (?, ?)',('Bob', 23))

    conn.commit()

else:
    print(f'이미 데이터가 {count}개 존재함')

# cur.execute('INSERT INTO users (name, age) VALUES (?, ?)',('Alice', 30))
# cur.execute('INSERT INTO users (name, age) VALUES (?, ?)',('Bob', 23))

# conn.commit()

cur.execute('SELECT * FROM users')
data = cur.fetchall()
print(data)
# [(1, 'Alice', 30), (2, 'Bob', 23)] 리스트 안의 튜플로 반환..

for row in data:
    print(f'이름: {row[1]}, 나이: {row[2]}')

conn.close()