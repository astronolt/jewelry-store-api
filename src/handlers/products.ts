import express, { Request, Response } from 'express'
import { JewelryProducts, Product } from '../models/jewelryProducts'

//ENV
import dotenv from 'dotenv'
dotenv.config()
const {
    TOKEN_SECRET
} = process.env


//JWT
import jwt from "jsonwebtoken";
const jwtVerify = (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, TOKEN_SECRET as jwt.Secret)
    } catch (error) {
        res.status(401)
        return
    }
}



const product = new JewelryProducts();

const index = async (req: Request, res: Response) => {
    const productList = await product.index()
    res.send('this is the INDEX route')
    res.json(productList)
}

const show = async (req: Request, res: Response) => {
    const productItem = await product.show(req.params.id)
    jwtVerify(req, res);
    res.json(productItem)
}


const create = async (req: Request, res: Response) => {

    const productItem: Product = {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        material: req.body.material,
        price: req.body.material,
        stock: req.body.material,
    }

    jwtVerify(req, res);
    
    const productsCreate = await product.create(productItem)    
    res.json(productsCreate)
}


const destroy = async (req: Request, res: Response) => {
    const productDelete = await product.delete(req.body.id)
}



export const productsHandler = (routes: express.Router) => {
    routes.get('/jewelry/products', index);
    routes.post('/jewelry/products/create', create);
    routes.delete('/jewelry/products/:id', destroy)

    //   app.get('/articles/:id', show)
    //   app.post('/articles', create)
}