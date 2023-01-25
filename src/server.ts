import express, { Request, Response } from 'express'
import { logger, bodyParser, cors } from './middleware'
import { APIroutes } from './routes/api'

const app = express()
const port = 3000

const APIMiddleware = [bodyParser, logger, cors, APIroutes]


app.use('/api', APIMiddleware, (req: Request, res: Response) => {    
    res.status(404).send("Sorry, we couldn't find that api channel!")
})

app.get('/', (req: Request, res: Response) => {    
    res.status(200).send("Jewelry Store Home")
})

app.use((req: Request, res: Response) => {
    res.status(404).send("Sorry, we couldn't find that!. Try again!")
})


app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})

export default app
