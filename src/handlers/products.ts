import express, { Request, Response } from 'express'
import { verifyAuthToken } from '../middleware'
import { JewelryProducts, Product } from '../models/products'



const product = new JewelryProducts();

const index = async (req: Request, res: Response) => {
    const productList = await product.index()
    res.send('this is the INDEX route')
    res.json(productList)
}

const show = async (req: Request, res: Response) => {
    const productItem = await product.show(req.params.id)
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
    
    const productsCreate = await product.create(productItem)    
    res.json(productsCreate)
}


const destroy = async (req: Request, res: Response) => {
    const productDelete = await product.delete(req.body.id)
}



export const productsHandler = (routes: express.Router) => {
    routes.get('/products', index);
    routes.get('/products/:id', show);
    routes.post('/products/create', verifyAuthToken, create);
    //routes.delete('/products/:id', destroy);
}

/*
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
*/