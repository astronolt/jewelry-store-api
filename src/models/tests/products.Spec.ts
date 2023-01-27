import { Products, Product } from '../products';
import { MODELDUMMY } from './dummy/products';

const product = new Products();

const MODELDUMMIES = Object.keys(MODELDUMMY).map(key => MODELDUMMY[key]);

describe("Product Models", () => {

   //create
   it("should have a create method", () => {
      expect(product.create).toBeDefined()
   });

   it('create method should add a product', async () => {
      for (const key in MODELDUMMY) {         
         const result = await product.create(MODELDUMMY[key]);
         expect(result).toEqual(MODELDUMMY[key]);
      }
   });


   //Index
   it("should have an index method", () => {
      expect(product.index).toBeDefined()
   });
   it('index method should show the products', async () => {
      const result = await product.index();
      expect(result).toEqual(MODELDUMMIES);
   });



   //Show
   it("should have a show method", () => {
      expect(product.show).toBeDefined()
   });

   it('index method should return a product', async () => {
      const result = await product.show("1");
      expect(result).toEqual(MODELDUMMIES[0]);
   });



});