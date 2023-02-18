import supertest from 'supertest'
import app from '../../server'

import { signAuthToken } from '../../middleware'

import { USERDUMMY } from '../../models/tests/dummy/users'
import { PRODUCTDUMMY } from '../../models/tests/dummy/products'
import { ORDERDUMMY, ORDERPRODUCTDUMMY } from '../../models/tests/dummy/orders'


const request = supertest(app)


const usersRoute = '/api/users'
const productsRoute = '/api/products'
const ordersRoute = '/api/orders'

const userData = Object.keys(USERDUMMY).map((key) => USERDUMMY[key])[0];
const userId = 1;


export const createUserDummy = (async () => {
   //create users
   for (const key in USERDUMMY) {
      await request
         .post(`${usersRoute}/adv/create-dummy`)
         .send(USERDUMMY[key])
   }
})


export const loginUserDummy = (async () => {
   //login user
   await request
      .get(`${usersRoute}`)
      .send(userData)
   return signAuthToken({})
})


export const createProductDummy = (async () => {
   //create products
   for (const key in PRODUCTDUMMY) {
      await request
         .post(`${productsRoute}/adv/create-dummy`)
         .send(PRODUCTDUMMY[key])
   }
})


export const createOrderDummy = (async () => {
   //create orders
   for (const key in ORDERDUMMY) {
      await request
         .post(`${ordersRoute}/adv/create-dummy`)
         .send(ORDERDUMMY[key])
   }
})


export const createOrderProductsDummy = (async (currentToken?: string) => {
   //create order_products
   for (const key in ORDERPRODUCTDUMMY) {
      await request
         .post(`${ordersRoute}/${userId}/products`)
         .set('Authorization', `Bearer ${currentToken}`)
         //.set('Authorization', `Bearer ${currentToken}`)
         .send(ORDERPRODUCTDUMMY[key])
   }
})


export const startDummies = (async () => {

   await createUserDummy()

   let currentToken = await loginUserDummy()   

   await createProductDummy()
   
   await createOrderDummy()

   await createOrderProductsDummy(currentToken)

   return {
      token: currentToken
   }

})


//Truncate recreate table
export const destroyDummies = (async () => {

   let tableName

   tableName = 'order_products'
   await request.post(`${ordersRoute}/adv/reset-table/${tableName}`)

   tableName = 'orders'
   await request.post(`${ordersRoute}/adv/reset-table/${tableName}`)

   tableName = 'products'
   await request.post(`${productsRoute}/adv/reset-table/${tableName}`)

   tableName = 'users'
   await request.post(`${usersRoute}/adv/reset-table/${tableName}`)
})