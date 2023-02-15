import supertest from 'supertest'
import app from '../../server'

import { Orders } from '../orders'
import { ORDERDUMMY } from './dummy/orders'
import { startDummies, destroyDummies } from '../../models/tests/headers'


const order = new Orders()

const orderData = Object.keys(ORDERDUMMY).map((key) => ORDERDUMMY[key])[0]

describe('Orders Models', () => {
    let currentToken
    
        
    beforeAll(async () => {
        const startupData = await startDummies();
        currentToken = startupData.token
    })
    
    afterAll(async () => {
        await destroyDummies();
    })


    //create order
    it('should have a create method', () => {
        expect(order.create).toBeDefined()
    })

    it('create method should add an order', async () => {
        //for (const key in ORDERDUMMY) {
            const result = await order.create(orderData)            
            expect(result).toEqual(orderData)
        //}
    })


    //add product
    it('should have a add product method', () => {
        expect(order.userOrder).toBeDefined()
    })


    //userOrder
    it('should have a app product method', () => {
        expect(order.userOrder).toBeDefined()
    })
    it('index method should show the current Order by user', async () => {
        const result = await order.userOrder(1)
        expect(result[0]).toEqual(orderData)
    })
})
