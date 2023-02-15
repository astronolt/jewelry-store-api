import supertest from 'supertest'
import app from '../../server'

import { startDummies, destroyDummies } from '../../models/tests/headers'
import { ORDERDUMMY } from '../../models/tests/dummy/orders'


const request = supertest(app)


const ordersRoute = '/api/orders'

const orderData = Object.keys(ORDERDUMMY).map((key) => ORDERDUMMY[key])[0]


let currentToken: string

describe('Orders Endpoint Responses', () => {
    
    beforeAll(async () => {
        const startupData = await startDummies();
        currentToken = startupData.token
    })
    
    afterAll(async () => {
        await destroyDummies();
    })


    it('Checks create /orders/create handler', async () => {
        const response = await request
            .post(`${ordersRoute}/create`)
            .set('Authorization', `Bearer ${currentToken}`)
            .send(orderData)

        expect(response.status).toBe(200)
    })
    
})
