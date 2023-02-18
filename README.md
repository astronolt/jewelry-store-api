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

To use this project, visit the end points:
`(http://localhost:3000/api)`
`<br>`

### USERS -

- `[POST] /users/create` - create a new user

  ```
  #request body sample
  {
     "username": "username",
     "username": "username",
     "firstname": "John",
     "lastname": "Doe"
  }
  ```
- `[POST] /users` - login a user

  ```
  #request body sample
  {
     "username": "username",
     "password": "password"
  }
  ```
- `/users/:id [GET]` - show a user profile [protected]

<br>
<br>

### PRODUCTS -

- `[POST] /products/create` -add a new product to products list [protected]

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
- `[POST] /products/:id` - get show product
- `[POST] /products/delete/:id` - add a product to the list [protected]

<br>
<br>

### ORDERS -

- `[POST] /orders/create` -add a new order [protected]

  ```
  #request body sample
  {
     user_id: 1,
     product_id: 1,
     status: 'active',
  }
  ```
- `[POST] orders/user/:user_id` - current order by user [protected]
  `<br>`
