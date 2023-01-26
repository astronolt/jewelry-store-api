import dotenv from 'dotenv'
dotenv.config()
import client from '../database/index'
import bcrypt from 'bcrypt'


const {
   PEPPER_CRYPT,
   SALT_ROUNDS
} = process.env


export type User = {
   username: string
   password: string
}

export class Users {

   async index(username: string, password: string): Promise<User|void> {
      try {
         const conn = await client.connect()
         const sql = 'SELECT password, username, firstName, lastName FROM users WHERE username=($1)';
         const result = await conn.query(sql, [username]);
         conn.release();

         const userData = result.rows[0]
         bcrypt.compareSync(password + PEPPER_CRYPT, userData.password)
     } catch (error) {
         throw new Error(`Could not log in this user: ${username}. Error ${error}`)
     }
   }

   
   async show(id: string): Promise<User> {
      try {
          const conn = await client.connect()
          const sql = 'SELECT * FROM jewelry_products WHERE id=($1)'
          const result = await conn.query(sql, [id])
          conn.release()

          return result.rows[0]
      } catch (error) {
          throw new Error(`Could not find jewelry with id: ${id}. Error ${error}`)
      }
  }


   async create(user: User): Promise<User> {
      try {

         const conn = await client.connect();
         const sql = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *';
         const hash = bcrypt.hashSync(
            user.password + PEPPER_CRYPT, parseInt(SALT_ROUNDS as string)
         );
         let result; 
         console.log(result = await conn.query(sql, [user.username, hash]));
         const userResult = result.rows[0]
            
         conn.release()

         return userResult

      } catch (err) {
         throw new Error(`unable to create user (${user.username}): ${err}`)
      }
   }
}