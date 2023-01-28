CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id integer REFERENCES users(id),
	quantity integer,
	status VARCHAR(50)
);