import dotenv from 'dotenv'
dotenv.config()
import client from '../database/index'
import bcrypt from 'bcrypt'


const {
   PEPPER_CRYPT,
   SALT_ROUNDS
} = process.env


export type User = {
   id?: number | string
   username: string
   password: string
}

export class Users {

   async create(user: User): Promise<User> {
      try {

         const conn = await client.connect()
         const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'

         const hash = bcrypt.hashSync(
            user.password + PEPPER_CRYPT, parseInt(SALT_ROUNDS as string)
         );

         const result = await conn.query(sql, [user.username, hash])
         const userResult = result.rows[0]

         conn.release()

         return userResult
      } catch (err) {
         throw new Error(`unable create user (${user.username}): ${err}`)
      }
   }


   async authenticate(username: string, password: string): Promise<User | null> {
      const conn = await client.connect()
      const sql = 'SELECT password_digest FROM users WHERE username=($1)'

      const result = await conn.query(sql, [username])
      
      console.log(password + PEPPER_CRYPT)

      if (result.rows.length) {

         const user = result.rows[0]

         console.log(user)

         if (bcrypt.compareSync(password + PEPPER_CRYPT, user.password_digest)) {
            return user
         }
      }

      return null
   }
}