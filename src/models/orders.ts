import client from '../database/index'
import { ORDERDUMMY } from '../models/tests/dummy/orders'


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


export class Orders {
    async create(order: Order): Promise<Order> {
        try {
            const conn = await client
                .connect()
            const sql =
                'INSERT INTO orders (user_id, quantity, status) VALUES ($1, $2, $3) RETURNING user_id, quantity, status'
            const result = await conn
                .query(sql, [
                    order.user_id,
                    order.quantity,
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


    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(ordersql, [orderId])

            const order = result.rows[0]

            if (order.status !== "open") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }

            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'

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


    async byUser(user_id: number): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = `SELECT user_id, quantity, status FROM orders WHERE user_id = '${user_id}'`
            const result = await conn.query(sql)
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
