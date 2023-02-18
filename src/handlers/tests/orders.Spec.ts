import supertest from 'supertest'
import app from '../../server'

import { startDummies, destroyDummies } from '../../models/tests/headers'
import { ORDERDUMMY } from '../../models/tests/dummy/orders'


const request = supertest(app)


const ordersRoute = '/api/orders'

const orderData = Object.keys(ORDERDUMMY).map((key) => ORDERDUMMY[key])[0]


let currentToken: string

describe('Orders Handler Responses', () => {
    
    beforeAll(async () => {
        const startupData = await startDummies();
        currentToken = startupData.token
    })
    
    afterAll(async () => {
        await destroyDummies();
    })


    it('Checks create handler [POST] /orders/create', async () => {
        const response = await request
            .post(`${ordersRoute}/create`)
            .set('Authorization', `Bearer ${currentToken}`)
            .send(orderData)

        expect(response.status).toBe(200)
    })
    
    
    it('Checks userOrder handler [POST] orders/user/:user_id', async () => {
        const userId = 1
        const response = await request
            .post(`${ordersRoute}/user/${userId}/`)
            .set('Authorization', `Bearer ${currentToken}`)
        expect(response.status).toBe(200)
    })
})
