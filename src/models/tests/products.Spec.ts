import { Products, Product } from '../products';

const product = new Products();

describe("Jewelry Store Methods", () => {

   const MODELDUMMY = {
      name: "Solitaire Diamond Ring",
      description: "A classic and timeless solitaire diamond ring set in 14k white gold",
      type: "ring",
      material: "14k white gold, diamond",
      price: 1999,
      stock: 5
   };


   it("should have an index method", () => {
      expect(product.index).toBeDefined()
   });


   //create
   it("should have a create method", () => {
      expect(product.create).toBeDefined()
   });

   it('create method should add a book', async () => {
      const result = await product.create(MODELDUMMY);
      expect(result).toEqual({
         id: "1",
         ...MODELDUMMY
      });
   });


   //Show
   it("should have a show method", () => {
      expect(product.show).toBeDefined()
   });

   it('index method should return a list of books', async () => {
      const result = await product.show("1");
      expect(result).toEqual({
         id: "1",
         ...MODELDUMMY
      });
   });


   it("should have a delete method", () => {
      expect(product.delete).toBeDefined()
   });

});