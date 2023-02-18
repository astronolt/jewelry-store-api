import client from '../database/index'
import { ORDERDUMMY, ORDERPRODUCTDUMMY } from '../models/tests/dummy/orders'
import { Product } from "./products";


export type Order = {
    id?: number
    user_id: number
    status: string
}

export type OrderProducts = {
    id?: number
    quantity: number
    order_id: number
    product_id: number
}

export type OrderUser = {
    id?: string
    name: Product["name"]
    description: Product["description"]
    price: Product["price"]
    quantity: OrderProducts["quantity"]
    status: Order["status"]
}


export class Orders {
    
    async create(order: Order): Promise<Order> {
        try {
            const conn = await client
                .connect()
            const sql =
                'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING user_id, status'
            const result = await conn
                .query(sql, [
                    order.user_id,
                    order.status,
                ])
            conn.release()

            return result.rows[0]
        } catch (error) {
            console.log(error)

            throw new Error(
                `Could not add new jewelry order for user: ${order.user_id}. Error ${error}`
            )
        }
    }


    async addProduct(quantity: number, orderId: number, productId: number): Promise<OrderProducts> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(ordersql, [orderId])

            const order = result.rows[0]

            if (order.status !== "active") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }

            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING quantity, order_id, product_id'

            const conn = await client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }


    async byUser(user_id: number): Promise<OrderUser[]> {
        try {
            const conn = await client.connect()
            const sql =
            `SELECT products.name, products.description, products.price, order_products.quantity, orders.status
            FROM orders
            JOIN order_products ON orders.id = order_products.order_id 
            JOIN products ON order_products.product_id = products.id
            WHERE orders.user_id = $1 AND orders.status = 'active'`
            const result = await conn.query(sql, [user_id])
            conn.release()

            return result.rows
        } catch (error) {
            console.log(error)

            throw new Error(`could not get jewelry collection. Error ${error}`)
        }
    }

    async createDummy(): Promise<Order> {
        try {
            let result
            for (const key in ORDERDUMMY) {
                result = await this.create(ORDERDUMMY[key])
            }

            return result as Order
        } catch (error) {
            console.log(error)

            throw new Error(`could not create dummies ${error}`)
        }
    }
}
