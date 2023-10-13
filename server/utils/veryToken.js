import jwt from "jsonwebtoken";
import { createError } from "./error.js";



export const veryfyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        next(createError(401, "You are not authenticated"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(401, "Token is not valid"))
        }
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {

    veryfyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorised!"))
        }
    })


}
export const verifyAdmin = (req, res, next) => {
    veryfyToken(req, res, () => {

        if (req.user.isAdmin) { 
            next()
        } else {
            return next(createError(403, "you are not authorises!"))
        }

    })
}