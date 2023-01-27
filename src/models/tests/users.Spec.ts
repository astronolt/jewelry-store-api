import { Users, User } from '../users';

const userModel = new Users();


describe("User Models", () => {

   const MODELDUMMY: User = {
      username: "user",
      password: "user",
      firstname: "John",
      lastname: "Doe",
   };


   //create
   it("should have a create method", () => {
      expect(userModel.create).toBeDefined()
   });

   it('create method should add a user', async () => {
      const result = await userModel.create(MODELDUMMY);
      expect(result).toEqual({
         username: MODELDUMMY.username,
         firstname: MODELDUMMY.firstname
      });
   });


   //index
   it("should have an index method", () => {
      expect(userModel.index).toBeDefined()
   });

   it('index method should allow a user login', async () => {
      const result = await userModel.index(
         MODELDUMMY.username, (MODELDUMMY.password as string)
      );
      expect(result).toEqual(true);
   });


   //Show
   it("should have a show method", () => {
      expect(userModel.show).toBeDefined()
   });

   it('index method should return a user profile', async () => {
      const result = await userModel.show("1");      
      expect(result).toEqual({
         username: 'username', firstname: 'John', lastname: 'Doe'
      });
   });


});