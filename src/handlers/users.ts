import express, { Request, Response } from 'express'
import { signAuthToken, verifyAuthToken } from '../middleware'
import { Users, User } from '../models/users'


const UsersModel = new Users();



const index = async (req: Request, res: Response) => {

   try {
      console.log(req.body);
      const user: User = {
         username: req.body.username,
         password: req.body.password,
      }
      const userId = await UsersModel.index(user.username, user.password)
      const SignedToken = signAuthToken({ user: userId });

      res
         .status(200)
         .set('Authorization', SignedToken)
         .send({ auth: true, token: SignedToken })
   } catch (err) {
      console.log(err);
      res
         .status(401)
         .send({ auth: false, message: "authentication failed" })
         ;

   }
}


const show = async (req: Request, res: Response) => {

   try {
      const userShow = await UsersModel.show(req.params.id)
      res.send('this is the Show route')
      res.json(userShow)
   } catch (err) {
      res.status(401)
      res.json(err)
      console.log(err);
   }
}


const create = async (req: Request, res: Response) => {

   try {
      console.log(req.body);
      const user: User = {
         username: req.body.username,
         password: req.body.password,
      }
      const userCreate = await UsersModel.create(user)
      console.log(userCreate);

      const token = signAuthToken({ user: userCreate });
      res
         .set('Authorization', token)
         .status(200)
         .json({ auth: true, token: token})
      ;

   } catch (err) {
      res
         .status(401)
         .json({ auths: false, message: 'couldnt create user' })
      ;
   }
}


export const usersHandler = (routes: express.Router) => {
   routes.get('/users/', index); //login
   routes.get('/users/:id', verifyAuthToken, show); //profile
   routes.post('/users/create', create); //create
}

/*
- Index [token required]
- Show [token required]
- Create [token required]
*/