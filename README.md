# Jewelry Store Backend

Welcome to the Jewelry Store Backend project! This is a Node and Express based API that provides all the necessary endpoints to support a frontend.

<br>

# Introduction

The Jewelry Store Backend project includes features such as authentication, data validation, error handling, and search functionality. The backend can handle the storage, retrieval, and modification of product information, ensuring that the information is secure, accurate, and accessible. The project has been implemented with best practices for code scalability, maintainability, and security.

### Technologies Used

- Node/Express for the application logic
- Postgres for the database
- dotenv for managing environment variables
- db-migrate for migrations
- jsonwebtoken for working with JWTs
- jasmine for testing

<br>

# Installation

```
$ npm install
$ npm run build
$ npm start
```

Note: example of .env file ``.env.example`` in root directory

### Testing

```
$ npm test
```

<br>
<br>

# How to use

To use this project, visit the end points below with the url prefix as `http://localhost:3000/api`

<br>

### USERS

- `[POST] /users/create/` - create a new user

  ```
  #request body sample
  {
    "username": "username",
    "username": "username",
    "firstname": "John",
    "lastname": "Doe"
  }
  ```
- `[POST] /users/` - login a user

  ```
  #request body sample
  {
    "username": "username",
    "password": "password"
  }
  ```
- [GET] `/users/:id/` - show a user profile [protected]

<br>
<br>

### PRODUCTS -

- `[POST] /products/create/` - add a new product to products list [protected]

  ```
  #request body sample
  {
    name: 'Solitaire Diamond Ring',
    description: 'A classic and timeless solitaire diamond ring',
    type: 'ring',
    material: '14k white gold, diamond',
    price: 1999,
    category: 'diamond',
    stock: 5,
  }
  ```
- `[GET] /products/` - get all products list
- `[POST] /products/:id/` - get show a product
- `[POST] /products/delete/:id/` - remove a product from the list [protected]

<br>
<br>

### ORDERS -

- `[POST] /orders/create/` - create a new order [protected]

  ```
  #request body sample
  {
    user_id: 1,
    status: 'active',
  }
  ```
- `[POST] /orders/:order_id/product/` - add product to order [protected]

  ```
  #request body sample
  {
    product_id: 1,
    quantity: 3,
  }
  ```
- `[POST] orders/user/:user_id/` - current order by user [protected]

<br>
<br>
<br>

# Creating the Databases and PostgreSQL User

For first time run and testing, you will need to create the necessary databases and a PostgreSQL user which can access them.

POSTGRES connection on `port: 5432 (default)`

1. Open a terminal and log in to PostgreSQL using the command
   ``psql -U postgres``
   If you have set a password for the postgres user, you will be prompted to enter it.
2. Once logged in, create the `jewelry_store_dev` and `jewelry_store_test` databases by running the following SQL commands:

   ```
   CREATE DATABASE jewelry_store_dev;
   CREATE DATABASE jewelry_store_test;
   ```
3. Next, create a new user with the necessary permissions to access the databases by running the following SQL command:

   ```
   CREATE USER jeweller WITH PASSWORD 'your_password_here';
   ```
4. Grant the necessary permissions to the user by running the following SQL commands:

   ```
   GRANT ALL PRIVILEGES ON DATABASE jewelry_store_dev TO jeweller;
   GRANT ALL PRIVILEGES ON DATABASE jewelry_store_test TO jeweller;
   ```
5. You can exit `psql` with the command `\q`.


<br>
<br>