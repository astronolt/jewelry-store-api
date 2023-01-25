import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
   origin: '*',
   optionsSuccessStatus: 200
   //methods: ['GET', 'POST'],
   //allowedHeaders: ['Content-Type', 'Authorization']
}));

export { app as cors }
