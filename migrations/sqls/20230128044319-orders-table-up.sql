CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id integer NOT NULL REFERENCES users(id),
	status VARCHAR(50),
	created_at TIMESTAMP DEFAULT NOW()
);