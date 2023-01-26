CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR,
    firstName VARCHAR,
    lastName VARCHAR
);