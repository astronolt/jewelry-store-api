import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Users, User } from '../models/users'

//ENV
import dotenv from 'dotenv'
dotenv.config()
const {
   TOKEN_SECRET
} = process.env



const UsersModel = new Users();

const create = async (req: Request, res: Response) => {

   console.log(req.body);

   try {

      const user: User = {
         username: req.body.username,
         password: req.body.password,
      }
      const newUser = await UsersModel.create(user)
      const token = jwt.sign({ user: newUser }, (TOKEN_SECRET as jwt.Secret))
      res.json(token)

   } catch (err) {
      res.status(401)
      res.json(err)
      console.log(err);
   }
}

export const usersHandler = (routes: express.Router) => {
   routes.get('/users/create', create);
}