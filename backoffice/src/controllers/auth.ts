import {NextFunction, Request, Response} from "express";
import sendResponse from "../tools/utils";
import jwt, {JwtPayload} from "jsonwebtoken";

export const verifyAuthRoute = async (req: Request, res: Response, next: NextFunction)=> {
    console.log(req.headers)
    if (req.headers.authorization === undefined ||req.headers.authorization === null ){
        return sendResponse(res, 401, "Unauthorized")
    }

    const token = req.headers.authorization.split(" ")[1]
    if (!token) return sendResponse(res, 401, "Unauthorized")

    try{
        const tokenData = <JwtPayload> jwt.verify(token, process.env.SECRET_KEY || '123456789')
        let newReqBody = req.body
        newReqBody.user_id = tokenData.user_id
        req.body = newReqBody
        next()
    } catch (e) {
        return sendResponse(res, 401, "Unauthorized")
    }


    next()
}