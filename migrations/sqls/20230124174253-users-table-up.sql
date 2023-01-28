CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR,
    firstname VARCHAR,
    lastname VARCHAR
);