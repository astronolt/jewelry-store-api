import supertest from 'supertest'
import app from '../../server'

import { signAuthToken } from '../../middleware'
import { ORDERDUMMY } from '../../models/tests/dummy/orders'
import { USERDUMMY } from '../../models/tests/dummy/users'
import { PRODUCTDUMMY } from '../../models/tests/dummy/products'

const request = supertest(app)

const ordersRoute = '/api/orders'
const usersRoute = '/api/users'
const productsRoute = '/api/products'

const orderData = Object.keys(ORDERDUMMY).map((key) => ORDERDUMMY[key])[0]
const productData = Object.keys(PRODUCTDUMMY).map((key) => PRODUCTDUMMY[key])[0]

let currentToken: string

describe('Orders Endpoint Responses', () => {
    //user authentication
    beforeAll(async () => {
        //create user
        await request.post(`${usersRoute}/adv/create-dummy`)

        //login user
        await request.get(`${usersRoute}`).send(USERDUMMY[0])

        currentToken = signAuthToken({})

        //create products
        await request.post(`${productsRoute}/adv/create-dummy`).send(productData)

        //create order by user
        await request.post(`${ordersRoute}/adv/create-dummy`).send(orderData)
    })

    //Truncate recreate table
    afterAll(async () => {
        let tableName = 'orders'
        await request.post(`${ordersRoute}/adv/reset-table/${tableName}`)

        tableName = 'users'
        await request.post(`${usersRoute}/adv/reset-table/${tableName}`)
    })


    it('Checks ORDERS/CREATE handler', async () => {
        const response = await request
            .post(`${ordersRoute}/create`)
            .set('Authorization', `Bearer ${currentToken}`)
            .send(orderData)

        expect(response.status).toBe(200)
    })
    

    it('Checks ORDERS/?user_id=:id handler', async () => {
        const loginResponse = await request
            .get(`${ordersRoute}/?user_id=1`)
            .set('Authorization', `Bearer ${currentToken}`)

        expect(loginResponse.status).toBe(200)
    })
})