import client from '../database/index'

export type Product = {
    id?: number | string
    name: string
    description: string
    type: string
    material: string
    price: number
    category: string
    stock: number
}

export class Products {

    async index(): Promise<Product[]> {
        try {
                        
            const conn = await client.connect()
            const sql = 'SELECT name, description, type, material, price, category, stock FROM products'
            const result = await conn.query(sql)
            conn.release()
            
            return result.rows
        } catch (error) {
            throw new Error(`could not get jewelry collection. Error ${error}`)
        }
    }


    async show(id: string): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT name, description, type, material, price, category, stock FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find jewelry with id: ${id}. Error ${error}`)
        }
    }


    async create(product: Product): Promise<Product> {
        try {            
            const conn = await client.connect()
            const sql =
                'INSERT INTO products (name, description, type, material, price, category, stock) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING name, description, type, material, price, category, stock'
            const result = await conn.query(sql, [
                product.name,
                product.description,
                product.type,
                product.material,
                product.price,
                product.category,
                product.stock
            ])
            conn.release()

            return result.rows[0]
        } catch (error) {
            console.log(error);
            
            throw new Error(
                `Could not add new jewelry ${product.name}. Error ${error}`
            )
        }
    }


    async destroy(id :string|number) {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM products WHERE id=($1);'
            const result = await conn.query(sql, [id])
            conn.release()

            console.log('deleted');
            return result.rows[0]
            
        } catch (error) {
            console.log(error);
            
            throw new Error(`Could not delete jewelry with id: ${id}. Error ${error}`)
        }
    }
}
