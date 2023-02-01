import express, { Request, Response } from 'express'
import { signAuthToken, verifyAuthToken } from '../middleware'
import { Users, User } from '../models/users'
import { USERDUMMY } from '../models/tests/dummy/users'
import { SharedModel } from '../models/shared'

const UsersModel = new Users()
const sharedModel = new SharedModel()

const index = async (req: Request, res: Response) => {
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

        const userId = await UsersModel.index(
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
        const userShow = await UsersModel.show(req.params.id)
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

        const userCreate = await UsersModel.create(user)
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

const createDummy = async (req: Request, res: Response) => {
    try {
        let result
        for (const key in USERDUMMY) {
            result = await UsersModel.create(USERDUMMY[key])
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}

const resetTable = async (req: Request, res: Response) => {
    console.log(req.params.table)

    try {
        const tableReset = await sharedModel.resetTable(req.params.table)
        res.status(200).json(tableReset)
    } catch (error) {
        res.status(401).json(error)
    }
}

export const usersHandler = (routes: express.Router) => {
    routes.post('/users/', index) //login
    routes.get('/users/:id', verifyAuthToken, show) //profile
    routes.post('/users/create', create) //create

    routes.post('/users/adv/create-dummy', createDummy)
    routes.post('/users/adv/reset-table/:table', resetTable)
}
