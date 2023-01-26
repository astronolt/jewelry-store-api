CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR,
    firstname VARCHAR,
    lastname VARCHAR
);