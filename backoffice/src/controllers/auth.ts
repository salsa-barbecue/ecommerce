import {NextFunction, Request, Response} from "express";
import sendResponse from "../tools/utils";
import jwt, {JwtPayload} from "jsonwebtoken";
import {User} from "../types/user";

export const verifyAuthRoute = async (req: Request, res: Response, next: NextFunction)=> {

    if (req.headers.authorization === undefined ||req.headers.authorization === null ){
        return sendResponse(res, 401, "Unauthorized")
    }

    try{
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return sendResponse(res, 401, "Unauthorized")

        const tokenData = <JwtPayload> jwt.verify(token, process.env.SECRET_KEY || '123456789')
        const currentUser = await User.findOne({where: {id: tokenData.user_id}})
        if(!currentUser) return sendResponse(res, 401, "Unauthorized")

        let newReqBody = req.body
        newReqBody.user_id = currentUser.id
        req.body = newReqBody
        next()
    } catch (e) {
        console.error(e)
        return sendResponse(res, 401, "Unauthorized")
    }
}