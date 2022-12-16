import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import AuthModel from "../model/AuthModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get Token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify Token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get the user from database using the token
            req.user = await AuthModel.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not Authorized, no token")
    }
})

export default protect