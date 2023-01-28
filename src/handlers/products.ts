import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middleware'
import { Products, Product } from '../models/products'



const productModel = new Products();

const index = async (req: Request, res: Response) => {
    try {
        const productList = await productModel.index()
        res
            .status(200)
            .json(productList)
    } catch (error) {
        res
            .status(401)
            .json(error)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const productItem = await productModel.show(req.params.id)
        res
            .status(200)
            .json(productItem)
    } catch (error) {
        res
            .status(401)
            .json(error)
    }
}


const create = async (req: Request, res: Response) => {
    try {
        const productItem: Product = {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            material: req.body.material,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
        }
        const productsCreate = await productModel.create(productItem)
        res
            .status(200)
            .json(productsCreate)
    } catch (error) {
        res
            .status(401)
            .json(error)
    }
}



const destroy = async (req: Request, res: Response) => {
    try {
        const productItem = await productModel.destroy(req.params.id)
        res
            .status(200)
            .json(productItem)
    } catch (error) {
        res
            .status(401)
            .json(error)
    }
}


const resetTable = async (req: Request, res: Response) => {
    try {
        const productItem = await productModel.resetTable()
        res
            .status(200)
            .json(productItem)
    } catch (error) {
        res
            .status(401)
            .json(error)
    }
}


export const productsHandler = (routes: express.Router) => {
    routes.get('/products', index);
    routes.get('/products/:id', show);
    routes.post('/products/create', verifyAuthToken, create);
    routes.post('/products/delete/:id', verifyAuthToken, destroy);
    routes.post('/products/adv/reset-table', verifyAuthToken, resetTable);
}

/*
- Index 
- Show
- Create [token required]
*/