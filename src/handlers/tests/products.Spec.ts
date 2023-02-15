import supertest from 'supertest'
import app from '../../server'
import { signAuthToken } from '../../middleware'

import { Product } from '../../models/products'
import { createUserDummy, loginUserDummy, destroyDummies } from '../../models/tests/headers'
import { PRODUCTDUMMY } from '../../models/tests/dummy/products'
import { USERDUMMY } from '../../models/tests/dummy/users'


const request = supertest(app)

const productsRoute = '/api/products'
const usersRoute = '/api/users'
const loginRoute = '/api/users'

const productData: Product = Object.keys(PRODUCTDUMMY).map(
    (key) => PRODUCTDUMMY[key]
)[0]

let currentToken: string

describe('Product Endpoint Responses', () => {
    
    //user authentication
    beforeAll(async () => {
        createUserDummy()
        currentToken = await loginUserDummy()
    })

    afterAll(async () => {
        await destroyDummies();
    })

    it('Checks PRODUCTS/CREATE handler', async () => {
        const response = await request
            .post(`${productsRoute}/create`)
            .set('Authorization', `Bearer ${currentToken}`)
            .send(productData)

        expect(response.status).toBe(200)
    })

    it('Checks PRODUCTS/INDEX handler', async () => {
        const loginResponse = await request.get(`${productsRoute}`)
        expect(loginResponse.status).toBe(200)
    })

    it('Checks PRODUCTS/SHOW:ID handler', async () => {
        const productId = 1
        const response = await request
            .get(`${productsRoute}/${productId}`)
            .set('Authorization', `Bearer ${currentToken}`)
        expect(response.status).toBe(200)
    })
})
