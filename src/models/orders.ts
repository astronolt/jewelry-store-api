import client from '../database/index'
import { ORDERDUMMY } from '../models/tests/dummy/orders'

export type Order = {
    id?: number
    user_id: number
    product_id: number
    quantity: number
    status: string
}

export class Orders {
    async create(order: Order): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql =
                'INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING user_id, product_id, quantity, status'
            const result = await conn.query(sql, [
                order.user_id,
                order.product_id,
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

    async byUser(user_id: number): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = `SELECT user_id, product_id, quantity, status FROM orders WHERE user_id = '${user_id}'`
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
