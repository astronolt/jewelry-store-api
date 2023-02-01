import supertest from 'supertest'
import app from '../../server'

import { Orders } from '../orders'
import { ORDERDUMMY } from './dummy/orders'

import { signAuthToken } from '../../middleware'
import { USERDUMMY } from '../../models/tests/dummy/users'


const request = supertest(app)

const ordersRoute = '/api/orders'
const usersRoute = '/api/users'

const order = new Orders()

const orderData = Object.keys(ORDERDUMMY).map((key) => ORDERDUMMY[key])[0]

describe('Orders Models', () => {

   let currentToken;
   //user authentication
   beforeAll(async () => {
      //create user
      await request.post(`${usersRoute}/adv/create-dummy`)

      //login user
      await request.get(`${usersRoute}`).send(USERDUMMY[0])

      currentToken = signAuthToken({})

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


   //create
   it('should have a create method', () => {
      expect(order.create).toBeDefined()
   })

   it('create method should add an order', async () => {
      for (const key in ORDERDUMMY) {
         const result = await order.create(ORDERDUMMY[key])
         expect(result).toEqual(ORDERDUMMY[key])
      }
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
