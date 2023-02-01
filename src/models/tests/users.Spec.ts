import supertest from 'supertest'
import app from '../../server'

import { Users } from '../users'
import { USERDUMMY } from '../../models/tests/dummy/users'

const request = supertest(app)

const userModel = new Users()
const usersRoute = '/api/users'
const userData = Object.keys(USERDUMMY).map((key) => USERDUMMY[key])[0]

describe('User Models', () => {
    //Truncate recreate table
    afterAll(async () => {
        const tableName = 'users'
        await request.post(`${usersRoute}/adv/reset-table/${tableName}`)
    })

    //create
    it('should have a create method', () => {
        expect(userModel.create).toBeDefined()
    })

    it('create method should add a user', async () => {
        const result = await userModel.create(userData)
        expect(result).toEqual({
            username: userData.username,
            firstname: userData.firstname,
        })
    })

    //index
    it('should have an index method', () => {
        expect(userModel.index).toBeDefined()
    })

    it('index method should allow a user login', async () => {
        const result = await userModel.index(
            userData.username,
            userData.password as string
        )
        expect(result).toEqual(true)
    })

    //Show
    it('should have a show method', () => {
        expect(userModel.show).toBeDefined()
    })

    it('index method should return a user profile', async () => {
        const result = await userModel.show('1')
        expect(result).toEqual({
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
        })
    })
})
