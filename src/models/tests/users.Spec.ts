import { Users, User } from '../users';

const userModel = new Users();


describe("Jewelry User Models", () => {

   const MODELDUMMY: User = {
      username: "user",
      password: "user",
   };


   //create
   it("should have a create method", () => {
      expect(userModel.create).toBeDefined()
   });

   it('create method should add a user', async () => {
      const result = await userModel.create(MODELDUMMY);
      expect(result).toEqual(MODELDUMMY);
   });


   //index
   it("should have an index method", () => {
      expect(userModel.index).toBeDefined()
   });

   it('index method should allow a user login', async () => {
      const result = await userModel.index(
         MODELDUMMY.username, MODELDUMMY.password
      );
      expect(result).toEqual(MODELDUMMY);
   });


   //Show
   it("should have a show method", () => {
      expect(userModel.show).toBeDefined()
   });

   it('index method should return a list of books', async () => {
      const result = await userModel.show("1");
      expect(result).toEqual(MODELDUMMY);
   });


});