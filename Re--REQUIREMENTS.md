# DB schema for all tables

documenting the schema for all tables in the database



## Users table

The `users` table is used to store information about the store's users.

| Column Name |  Data Type  | Description |
| :---------: | :---------: | ----------- |
|     id     |  interger  | PRIMARY KEY |
|  username  | varchar(50) | UNIQUE      |
|  password  |   varchar   |             |
|  firstname  |   varchar   |             |
|  lastname  |   varchar   |             |

<br>
<br>

## Products table

The `products` table is used to store information about the store's products.

| Column Name |  Data Type  | Description |
| :---------: | :----------: | ----------- |
|     id     |   interger   | PRIMARY KEY |
|    name    | varchar(50) |             |
| description | varchar(250) |             |
|    type    | varchar(50) |             |
|  material  | varchar(50) |             |
|    price    |   interger   |             |
|  category  | varchar(70) |             |
|    stock    |   interger   |             |

<br>
<br>

## Orders table

The `orders` table is used to store information about the store's orders.

| Column Name |  Data Type  | Description          |
| :---------: | :---------: | -------------------- |
|     id     |  interger  | PRIMARY KEY          |
|   user_id   |  interger  | REFERENCES users(id) |
|   status   | varchar(50) |                      |
| created_at |  timestamp  | DEFAULTNOW()         |

<br>
<br>

## Orders Product table

The `order_products` table is used to store information between the store's orders and the products.

| Column Name | Data Type | Description             |
| :---------: | :-------: | ----------------------- |
|     id     | interger | PRIMARY KEY             |
|  quantity  | interger |                         |
|  order_id  | interger | REFERENCES orders(id)   |
| product_id | interger | REFERENCES products(id) |

<br>
<br>
