import supertest from 'supertest'
import app from '../../server'

import { Orders } from '../orders'
import { ORDERDUMMY } from './dummy/orders'

import { signAuthToken } from '../../middleware'
import { USERDUMMY } from '../../models/tests/dummy/users'
import { PRODUCTDUMMY } from '../../models/tests/dummy/products'

const request = supertest(app)

const ordersRoute = '/api/orders'
const usersRoute = '/api/users'
const productsRoute = '/api/products'

const order = new Orders()

const orderData = Object.keys(ORDERDUMMY).map((key) => ORDERDUMMY[key])[0]
const userData = Object.keys(USERDUMMY).map((key) => USERDUMMY[key])[0]
const productData = Object.keys(PRODUCTDUMMY).map((key) => PRODUCTDUMMY[key])[0]

describe('Orders Models', () => {
    let currentToken
    //user authentication
    beforeAll(async () => {
        //create user
        await request.post(`${usersRoute}/adv/create-dummy`)

        //login user
        await request.get(`${usersRoute}`).send(userData)

        currentToken = signAuthToken({})

        //create product
        await request.post(`${productsRoute}/adv/create-dummy`).send(productData)

        //create order by user
        await request.post(`${ordersRoute}/adv/create-dummy`).send(orderData)
    })

    //Truncate recreate table
    afterAll(async () => {
        let tableName = 'orders'
        await request.post(`${ordersRoute}/adv/reset-table/${tableName}`)

        tableName = 'products'
        await request.post(`${productsRoute}/adv/reset-table/${tableName}`)

        tableName = 'users'
        await request.post(`${usersRoute}/adv/reset-table/${tableName}`)
    })

    //create
    it('should have a create method', () => {
        expect(order.create).toBeDefined()
    })

    it('create method should add an order', async () => {
        //for (const key in ORDERDUMMY) {
            const result = await order.create(orderData)            
            expect(result).toEqual(orderData)
        //}
    })

    //byUser
    it('should have an index method', () => {
        expect(order.byUser).toBeDefined()
    })
    it('index method should show the current Order by user', async () => {
        const result = await order.byUser(1)
        expect(result[0]).toEqual(orderData)
    })
})
