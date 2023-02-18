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

    it('Checks create handler [POST] /users/create', async () => {
        const response = await request
            .post(`${usersRoute}/create`)
            .send({
                username: userData.username + "_test",
                password: userData.password + "_test",
                firstname: userData.firstname + "_test",
                lastname: userData.lastname + "_test",
            })
        expect(response.status).toBe(200)
    })

    it('Checks login handler [POST] /users/', async () => {
        const loginResponse = await request
            .post(`${usersRoute}`)
            .send({
                username: userData.username + "_test",
                password: userData.password + "_test",
            })
        currentToken = loginResponse.body.token

        expect(loginResponse.status).toBe(200)
    })

    it('Checks show handler [GET] /users/:id', async () => {
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
