import express from 'express'

export const logger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const url = req.url
    console.log(`${url} was visited!`)
    next()
}
