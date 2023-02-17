import supertest from 'supertest'
import app from '../../server'
import { signAuthToken } from '../../middleware'

import { Product } from '../../models/products'
import { createUserDummy, loginUserDummy, destroyDummies } from '../../models/tests/headers'
import { PRODUCTDUMMY } from '../../models/tests/dummy/products'
import { USERDUMMY } from '../../models/tests/dummy/users'


const request = supertest(app)

const productsRoute = '/api/products'

const productData: Product = Object.keys(PRODUCTDUMMY).map(
    (key) => PRODUCTDUMMY[key]
)[0]

let currentToken: string

describe('Product Handler Responses', () => {

    //user authentication
    beforeAll(async () => {
        await createUserDummy()
        currentToken = await loginUserDummy()
    })

    afterAll(async () => {
        await destroyDummies();
    })

    it('Checks create handler [POST] /products/create', async () => {        
        const response = await request
            .post(`${productsRoute}/create`)
            .set('Authorization', `Bearer ${currentToken}`)
            .send(productData)

        expect(response.status).toBe(200)
    })

    it('Checks index handler [GET] /products/', async () => {
        const loginResponse = await request
            .get(`${productsRoute}`)

        expect(loginResponse.status).toBe(200)
    })

    it('Checks show handler [POST] /products/:id', async () => {
        const productId = 1
        const response = await request
            .post(`${productsRoute}/${productId}`)
            .set('Authorization', `Bearer ${currentToken}`)
        expect(response.status).toBe(200)
    })

    it('Checks delete handler [POST] /products/delete/:id', async () => {
        const productId = 1
        const response = await request
            .post(`${productsRoute}/delete/${productId}`)
            .set('Authorization', `Bearer ${currentToken}`)
        expect(response.status).toBe(200)
    })
})
