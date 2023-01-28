import client from '../database/index'

export type Order = {
   id?: number | string
   user_id: string
   quantity: number
   status: string
}

export class Orders {

   async byUser(username: string): Promise<Order[]> {
      try {

         const conn = await client.connect()
         const sql = `SELECT name, description, type, material, price, category, stock FROM orders WHERE user_id = ${username}`
         const result = await conn.query(sql)
         conn.release()

         return result.rows
      } catch (error) {
         throw new Error(`could not get jewelry collection. Error ${error}`)
      }
   }

}
