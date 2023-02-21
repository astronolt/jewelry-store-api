import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middleware'
import { Orders, Order } from '../models/orders'
import { SharedModel } from '../models/shared'

const orderModel = new Orders()
const sharedModel = new SharedModel()


const create = async (req: Request, res: Response) => {
    try {
        const orderItem: Order = {
            user_id: req.body.user_id,
            status: req.body.status,
        }
        const productsCreate = await orderModel.create(orderItem)
        res.status(200).json(productsCreate)
    } catch (error) {
        res.status(401).json(error)
    }
}


const addProduct = async (req: Request, res: Response) => {
    const orderId: number = parseInt(req.params.order_id)
    const productId: number = parseInt(req.body.product_id)
    const quantity: number = parseInt(req.body.quantity)

    try {
        const addedProduct = await orderModel
            .addProduct(quantity, orderId, productId);
        res
            .status(200)
            .json(addedProduct)
    } catch (err) {
        res
            .status(400)
            .json(err)
    }
}

/* Current Order by user (args: user id) */
const byUser = async (req: Request, res: Response) => {    
    try {
        const userOrder = await orderModel.byUser(
            parseInt(req.params.user_id as string)
        )
        res.status(200)
        res.json(userOrder)
    } catch (error) {        
        res.status(401)
        res.json(error)
    }
}

const createDummy = async (req: Request, res: Response) => {
    try {
        const ordersCreate = await orderModel.createDummy()
        res.status(200).json(ordersCreate)
    } catch (error) {
        res.status(401).json(error)
    }
}


const resetTable = async (req: Request, res: Response) => {
    try {
        const tableReset = await sharedModel.resetTable(req.params.table)
        res.status(200).json(tableReset)
    } catch (error) {
        res.status(401).json(error)
    }
}


/* HANDLERS */
export const ordersHandler = (routes: express.Router) => {
    routes.post('/orders/create', verifyAuthToken, create)

    // add product
    routes.post('/orders/:order_id/product', verifyAuthToken, addProduct)

    //Current Order by user
    routes.post('/orders/user/:user_id/', verifyAuthToken, byUser)

    routes.post('/orders/adv/create-dummy', createDummy)
    routes.post('/orders/adv/reset-table/:table', resetTable)
}
