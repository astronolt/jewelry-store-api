import supertest from 'supertest'
import app from '../../server'

import { Orders } from '../orders'
import { ORDERDUMMY, ORDERPRODUCTDUMMY } from './dummy/orders'
import { startDummies, destroyDummies } from '../../models/tests/headers'


const order = new Orders()

const orderData = Object.keys(ORDERDUMMY).map((key) => ORDERDUMMY[key])[0]
const orderProductData = Object.keys(ORDERPRODUCTDUMMY).map((key) => ORDERPRODUCTDUMMY[key])[0]

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
        const result = await order.create(orderData)            
        expect(result).toEqual(orderData)
    })
    
    
    //add product to order
    it('should have a add product to order method', () => {
        expect(order.addProduct).toBeDefined()
    })
    it('create method should add a product to the current order', async () => {
        const result = await order.addProduct(
            orderProductData.quantity,
            orderProductData.order_id,
            orderProductData.product_id
            )            
        expect(result).toEqual(orderProductData)
    })
    
    
    //userOrder
    it('should have a userOrder method', () => {
        expect(order.byUser).toBeDefined()
    })
    it('userOrder method should show the current Order by user', async () => {
        const result = await order.byUser(1)
        expect(result[0]).toEqual(orderData)
    })
})
