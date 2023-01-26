import supertest from 'supertest'
import app from '../../server'
import { User } from '../../models/users'

const request = supertest(app)


describe('User Endpoint Responses', () => {

   const usersRoute = '/api/users';
   const DUMMYDATA: User = {
      username: "test",
      password: "test"
   }

   it('Checks INDEX', async () => {
      const response = await request
         .get(`${usersRoute}`)
         .send(DUMMYDATA)
      ;
      expect(response.status).toBe(200)
   })

   it('Checks SHOW', async () => {
      const userId = 1;
      const response = await request
         .get(`${usersRoute}/${userId}`)
         .send(DUMMYDATA)
      ;
      expect(response.status).toBe(200)
   })

   it('Checks CREATE', async () => {
      const response = await request
         .post(`${usersRoute}/create`)
         .send(DUMMYDATA)
      ;
      expect(response.status).toBe(200)
   })

})