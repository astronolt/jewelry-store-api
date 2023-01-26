import supertest from 'supertest'
import app from '../../server'
import { User } from '../../models/users'

const request = supertest(app)




const usersRoute = '/api/users';
   
const userData : User = {
   username: "username",
   password: "password",
   firstname: "John",
   lastname: "Doe",
}

let currenToken:string;

describe('User Endpoint Responses', () => {

   it('Checks USERS - CREATE handler', async () => {
      const response = await request
         .post(`${usersRoute}/create`)
         .send({
            username: userData.username,
            password: userData.password,
            firstname: userData.firstname,
            lastname: userData.lastname,
         })
      ;
      
      expect(response.status).toBe(200)
   })


   it('Checks USERS - INDEX handler', async () => {
      const loginResponse = await request
         .get(`${usersRoute}`)
         .send({
            username: userData.username,
            password: userData.password,
         })
      ;
      currenToken = loginResponse.body.token;

      expect(loginResponse.status).toBe(200)
   })


   it('Checks USERS - SHOW handler', async () => {
      const userId = 1;
      const response = await request
         .get(`${usersRoute}/${userId}`)
         .set('Authorization', `Bearer ${currenToken}`)
         .send({
            username: userData.username,
            password: userData.password,
         })
      ;
      expect(response.status).toBe(200)
   })

})