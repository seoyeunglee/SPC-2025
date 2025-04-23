CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL
);

INSERT INTO users(username, password) VALUES ('user1', 'pass1');
INSERT INTO users(username, password) VALUES ('user2', 'pass2');

INSERT INTO products(name, price) VALUES ('APPLE', 1000);
INSERT INTO products(name, price) VALUES ('BANANA', 2000);
INSERT INTO products(name, price) VALUES ('ORANGE', 3000);
