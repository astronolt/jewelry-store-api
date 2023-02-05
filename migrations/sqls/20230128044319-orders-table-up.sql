CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id integer NOT NULL REFERENCES users(id),
	product_id integer NOT NULL REFERENCES products(id),
	quantity integer,
	status VARCHAR(50),
	created_at TIMESTAMP DEFAULT NOW()
);