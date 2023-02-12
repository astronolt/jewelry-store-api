import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middleware'
import { Orders, Order } from '../models/orders'
import { SharedModel } from '../models/shared'

const orderModel = new Orders()
const sharedModel = new SharedModel()

const byUser = async (req: Request, res: Response) => {
    try {
        const userOrder = await orderModel.byUser(
            parseInt(req.query.user_id as string)
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

const create = async (req: Request, res: Response) => {
    try {
        const orderItem: Order = {
            user_id: req.body.user_id,
            quantity: req.body.quantity,
            status: req.body.status,
        }
        const productsCreate = await orderModel.create(orderItem)
        res.status(200).json(productsCreate)
    } catch (error) {
        res.status(401).json(error)
    }
}

const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt(req.body.quantity)

    try {
        const addedProduct = await orderModel.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const resetTable = async (req: Request, res: Response) => {
    console.log(req.params.table)

    try {
        const tableReset = await sharedModel.resetTable(req.params.table)
        res.status(200).json(tableReset)
    } catch (error) {
        res.status(401).json(error)
    }
}

export const ordersHandler = (routes: express.Router) => {
    routes.get('/orders', verifyAuthToken, byUser)
    routes.post('/orders/create', verifyAuthToken, create)

    // add product
    routes.post('/orders/:id/products', addProduct)

    routes.post('/orders/adv/create-dummy', createDummy)
    routes.post('/orders/adv/reset-table/:table', resetTable)
}
