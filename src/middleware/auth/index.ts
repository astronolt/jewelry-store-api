import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

//ENV
import dotenv from 'dotenv'
dotenv.config()
const {
   TOKEN_SECRET,
   TOKEN_EXPIRE
} = process.env



export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
   try {
      const authorizationHeader = (req.headers.authorization as string);
      if(!authorizationHeader){
         return res.status(401)
            .send({ auth: false, message: 'No token provided.' })
         ;
      }      
      const token = authorizationHeader.split(' ')[1];
      const decoded = jwt.verify(token, TOKEN_SECRET as jwt.Secret)
      

      next()
   } catch (error) {
      return res.status(401)
         .send({ auth: false, message: 'Failed to authenticate token. ' + error });
   }
}


export const signAuthToken = (payload:  string | object | Buffer) => {
   return jwt.sign(payload, TOKEN_SECRET as jwt.Secret, { expiresIn: TOKEN_EXPIRE })
}
