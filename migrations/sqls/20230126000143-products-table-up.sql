CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	description VARCHAR(250),
	type VARCHAR(50),
	material VARCHAR(50),
	price integer,
	category VARCHAR(70),
	stock integer
);