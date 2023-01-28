import express, { Request, Response } from 'express'
import { signAuthToken, verifyAuthToken } from '../middleware'
import { Users, User } from '../models/users'


const UsersModel = new Users();


const index = async (req: Request, res: Response) => {

   try {
      const user: User = {
         username: req.body.username,
         password: req.body.password,
      }

      if(!user.username || !user.password || (user.password as string).length < 4){
         res
         .status(401)
         .json({ auth: false, message: "check your user credentials, and try again" })         
      }

      const userId = await UsersModel.index(user.username, user.password as string)
      const SignedToken = signAuthToken({ user: userId });

      res
         .status(200)
         .set('Authorization', `Bearer ${SignedToken}`)
         .json({ auth: true, token: SignedToken })
   } catch (err) {
      res
         .status(401)
         .json({ auth: false, message: "authentication failed" })

   }
}


const show = async (req: Request, res: Response) => {

   try {
      const userShow = await UsersModel.show(req.params.id)
      res.status(200)
      res.json(userShow)
   } catch (error) {
      res.status(401)
      res.json(error)
   }
}


const create = async (req: Request, res: Response) => {

   try {
      const user: User = {
         username: req.body.username,
         password: req.body.password,
         firstname: req.body.firstname ?? "",
         lastname: req.body.lastname ?? "",
      }
      
      const userCreate = await UsersModel.create(user);
      const SignedToken = signAuthToken({ user: userCreate });

      res
         .status(200)
         .set('Authorization', `Bearer ${SignedToken}`)
         .json({ auth: true, message: `Welcome ${user.firstname}, your account has been created.`, data: userCreate, token: SignedToken })
      

   } catch (err) {
      res
         .status(401)
         .json({ auth: false, message: 'couldnt create user' })
   }
}


export const usersHandler = (routes: express.Router) => {
   routes.get('/users/', index); //login
   routes.get('/users/:id', verifyAuthToken, show); //profile
   routes.post('/users/create', create); //create
}