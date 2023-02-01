import supertest from 'supertest'
import app from '../../server'
import { User } from '../../models/users'

const request = supertest(app)

const usersRoute = '/api/users'

const userData: User = {
    username: 'username',
    password: 'password',
    firstname: 'John',
    lastname: 'Doe',
}

let currentToken: string

describe('User Handler Responses', () => {
    //Truncate recreate table
    afterAll(async () => {
        const tableName = 'users'
        await request.post(`${usersRoute}/adv/reset-table/${tableName}`)
    })

    it('Checks USERS/CREATE handler', async () => {
        const response = await request.post(`${usersRoute}/create`).send({
            username: userData.username,
            password: userData.password,
            firstname: userData.firstname,
            lastname: userData.lastname,
        })
        expect(response.status).toBe(200)
    })

    it('Checks USERS/INDEX handler', async () => {
        const loginResponse = await request.post(`${usersRoute}`).send({
            username: userData.username,
            password: userData.password,
        })
        currentToken = loginResponse.body.token

        expect(loginResponse.status).toBe(200)
    })

    it('Checks USERS/SHOW:ID handler', async () => {
        const userId = 1
        const response = await request
            .get(`${usersRoute}/${userId}`)
            .set('Authorization', `Bearer ${currentToken}`)
            .send({
                username: userData.username,
                password: userData.password,
            })
        expect(response.status).toBe(200)
    })
})
