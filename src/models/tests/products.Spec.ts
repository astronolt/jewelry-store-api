import { Products } from '../products'
import { PRODUCTDUMMY } from './dummy/products'

const product = new Products()

const MODELDUMMIES = Object.keys(PRODUCTDUMMY).map((key) => PRODUCTDUMMY[key])

describe('Product Models', () => {
    //create
    it('should have a create method', () => {
        expect(product.create).toBeDefined()
    })

    it('create method should add a product', async () => {
        for (const key in PRODUCTDUMMY) {
            const result = await product.create(PRODUCTDUMMY[key])
            expect(result).toEqual(PRODUCTDUMMY[key])
        }
    })

    //Index
    it('should have an index method', () => {
        expect(product.index).toBeDefined()
    })
    it('index method should show the products', async () => {
        const result = await product.index()
        expect(result).toEqual(MODELDUMMIES)
    })

    //Show
    it('should have a show method', () => {
        expect(product.show).toBeDefined()
    })

    it('show method should return a product', async () => {
        const result = await product.show('1')
        expect(result).toEqual(MODELDUMMIES[0])
    })
})
