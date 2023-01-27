import supertest from 'supertest'
import app from '../../server'
import { Product } from '../../models/products'

const request = supertest(app)


const productsRoute = '/api/products';
const loginRoute = '/api/users';


const productData: Product = {
   id: 1,
   name: "Solitaire Diamond Ring",
   description: "A classic and timeless solitaire diamond ring set in 14k white gold",
   type: "ring",
   material: "14k white gold, diamond",
   price: 1999,
   stock: 5
}

let currentToken: string;


describe('Product Endpoint Responses', () => {


   beforeAll(async () => {
      const loginResponse = await request
         .get(loginRoute)
         .send({
            username: "username",
            password: "password",
         })

      currentToken = loginResponse.body.token;
      console.log(currentToken);

   });


   it('Checks PRODUCTS/CREATE handler', async () => {
      const response = await request
         .post(`${productsRoute}/create`)
         .set('Authorization', `Bearer ${currentToken}`)
         .send({
            name: productData.name,
            description: productData.description,
            type: productData.type,
            material: productData.material,
            price: productData.price,
            stock: productData.stock,
         })

         ;

      expect(response.status).toBe(200)
   })


   it('Checks PRODUCTS/INDEX handler', async () => {
      const loginResponse = await request
         .get(`${productsRoute}`)
      expect(loginResponse.status).toBe(200)
   })


   it('Checks PRODUCTS/SHOW:ID handler', async () => {
      const productId = 1;
      const response = await request
         .get(`${productsRoute}/${productId}`)
         .set('Authorization', `Bearer ${currentToken}`)
      expect(response.status).toBe(200)
   })

})