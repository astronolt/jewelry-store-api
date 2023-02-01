import dotenv from 'dotenv'
dotenv.config()
import client from '../database/index'
import bcrypt from 'bcrypt'
import { USERDUMMY } from '../models/tests/dummy/users'

const { PEPPER_CRYPT, SALT_ROUNDS } = process.env

export type User = {
    username: string
    password?: string
    firstname?: string
    lastname?: string
}

export class Users {
    async index(username: string, password: string): Promise<User | boolean> {
        try {
            const conn = await client.connect()
            const sql =
                'SELECT password, username, firstname, lastname FROM users WHERE username=($1)'
            const result = await conn.query(sql, [username])
            conn.release()

            const userData = result.rows[0]
            const compareAccess = bcrypt.compareSync(
                password + PEPPER_CRYPT,
                userData.password as string
            )
            if (!compareAccess) {
                throw new Error(
                    `Could not log in this user: ${username}. Check your password`
                )
            }

            return true
        } catch (error) {
            throw new Error(
                `Could not log in this user: ${username}. Error ${error}`
            )
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect()
            const sql =
                'SELECT username, firstname, lastname FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Could not find user with id: ${id}. Error ${error}`
            )
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect()
            const sql =
                'INSERT INTO users (username, password, firstname, lastname ) VALUES($1, $2, $3, $4) RETURNING username, firstname'
            const hash = bcrypt.hashSync(
                (user.password as string) + (PEPPER_CRYPT as string),
                parseInt(SALT_ROUNDS as string)
            )
            const result = await conn.query(sql, [
                user.username,
                hash,
                user.firstname,
                user.lastname,
            ])
            const userResult = result.rows[0]
            conn.release()

            return userResult
        } catch (err) {
            throw new Error(`unable to create user (${user.username}): ${err}`)
        }
    }

    async createDummy(): Promise<User> {
        try {
            const result = await this.create(USERDUMMY[0])

            return result as User
        } catch (error) {
            console.log(error)

            throw new Error(`could not create dummies ${error}`)
        }
    }
}
