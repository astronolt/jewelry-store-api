import express, { Request, Response } from 'express'
import { signAuthToken, verifyAuthToken } from '../middleware'
import { Users, User } from '../models/users'
import { Orders, Order } from '../models/orders'
import { SharedModel } from '../models/shared'
import { USERDUMMY } from '../models/tests/dummy/users'

const usersModel = new Users()
const orderModel = new Orders()
const sharedModel = new SharedModel()



const index = async (req: Request, res: Response) => {
    res.send('You are logged in!')
}

const login = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            password: req.body.password,
        }

        if (
            !user.username ||
            user.username.length < 3 ||
            !user.password ||
            user.password.length < 3
        ) {
            res.status(401).json({
                auth: false,
                message: 'check your user credentials, and try again',
            })

            return
        }

        const userId = await usersModel.index(
            user.username,
            user.password as string
        )
        const SignedToken = signAuthToken({ user: userId })

        res.status(200)
            .set('Authorization', `Bearer ${SignedToken}`)
            .json({ auth: true, token: SignedToken })
    } catch (err) {
        res.status(401).json({ auth: false, message: 'authentication failed' })
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const userShow = await usersModel.show(req.params.id)
        res.status(200)
        res.json(userShow)
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname ?? '',
            lastname: req.body.lastname ?? '',
        }

        if (
            !user.username ||
            user.username.length < 3 ||
            !user.password ||
            user.password.length < 3
        ) {
            res.status(401).json({
                auth: false,
                message:
                    'check your user credentials maybe too short, and try again',
            })

            return
        }

        const userCreate = await usersModel.create(user)
        const SignedToken = signAuthToken({ user: userCreate })

        res.status(200)
            .set('Authorization', `Bearer ${SignedToken}`)
            .json({
                auth: true,
                message: `Welcome ${user.firstname}, your account has been created.`,
                data: userCreate,
                token: SignedToken,
            })
    } catch (err) {
        res.status(401).json({ auth: false, message: 'couldnt create user' })
    }
}

/* Current Order by user (args: user id) */
const userOrder = async (req: Request, res: Response) => {
    try {
        const userOrder = await orderModel.userOrder(
            parseInt(req.body.user_id as string)
        )
        res.status(200)
        res.json(userOrder)
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

const createDummy = async (req: Request, res: Response) => {
    try {
        let result
        for (const key in USERDUMMY) {
            result = await usersModel.create(USERDUMMY[key])
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}

const resetTable = async (req: Request, res: Response) => {
    try {
        const tableReset = await sharedModel.resetTable(req.params.table)
        res.status(200).json(tableReset)
    } catch (error) {
        res.status(401).json(error)
    }
}

export const usersHandler = (routes: express.Router) => {
    routes.get('/users/', verifyAuthToken, index) //user home
    routes.post('/users/', login) //login
    routes.post('/users/create', create) //create
    routes.get('/users/:id', verifyAuthToken, show) //profile

    //Current Order by user
    routes.post('/users/:id/orders/', verifyAuthToken, userOrder)

    routes.post('/users/adv/create-dummy', createDummy)
    routes.post('/users/adv/reset-table/:table', resetTable)
}
