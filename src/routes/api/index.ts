import express, { Request, Response } from 'express'
import { productsHandler } from '../../handlers/products'
import { usersHandler } from '../../handlers/users'
import { ordersHandler } from '../../handlers/orders'

const routes = express.Router()

routes.get('/', (req: Request, res: Response): void => {
    res.send('Jewelry Store API route')
})

productsHandler(routes);

usersHandler(routes);

ordersHandler(routes);

export { routes as APIroutes }
