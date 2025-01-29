CREATE DATABASE techtask;

\c techtask

-- Создание таблицы users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed'))
);

INSERT INTO users (name, email) VALUES
('Иван Иванов', 'ivan@example.com'),
('Петр Петров', 'petr@example.com');

INSERT INTO orders (user_id, amount, order_date, status) VALUES
(1, 1500.00, '2023-01-15', 'completed'),
(2, 2500.75, '2023-02-22', 'pending');