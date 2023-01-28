import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middleware'
import { Orders, Order } from '../models/orders'


const OrdersModel = new Orders();


const byUser = async (req: Request, res: Response) => {

   try {
      const userOrder = await OrdersModel.byUser(req.query.user_id as string)
      res.status(200)
      res.json(userOrder)
   } catch (error) {
      res.status(401)
      res.json(error)
   }
}



export const ordersHandler = (routes: express.Router) => {
   routes.get('/orders', verifyAuthToken ,byUser);
}