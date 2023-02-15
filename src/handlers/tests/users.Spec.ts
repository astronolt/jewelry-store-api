import supertest from 'supertest'
import app from '../../server'

import { startDummies, destroyDummies } from '../../models/tests/headers'
import { USERDUMMY } from '../../models/tests/dummy/users'


const request = supertest(app)

const usersRoute = '/api/users'
const userData = Object.keys(USERDUMMY).map((key) => USERDUMMY[key])[0]

let currentToken: string

describe('User Handler Responses', () => {
    

    beforeAll(async () => {
        await startDummies();
    })
    
    afterAll(async () => {
        await destroyDummies();
    })

    it('Checks create /USERS/CREATE handler', async () => {
        const response = await request.post(`${usersRoute}/create`).send({
            username: userData.username + "_test",
            password: userData.password + "_test",
            firstname: userData.firstname + "_test",
            lastname: userData.lastname + "_test",
        })
        expect(response.status).toBe(200)
    })

    it('Checks login /USERS/ handler', async () => {
        const loginResponse = await request.post(`${usersRoute}`).send({
            username: userData.username,
            password: userData.password,
        })
        currentToken = loginResponse.body.token

        expect(loginResponse.status).toBe(200)
    })

    it('Checks show USERS/:ID handler', async () => {
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

    it('Checks userOrder USERS/:ID/ORDERS handler', async () => {
        const userId = 1
        const response = await request
            .post(`${usersRoute}/${userId}/orders/`)
            .set('Authorization', `Bearer ${currentToken}`)
        expect(response.status).toBe(200)
    })
})
