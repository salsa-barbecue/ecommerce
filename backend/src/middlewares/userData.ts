import {NextFunction, Request, Response} from "express";
import sendResponse from "../tools/utils";

export const verifyUserData = async (req: Request, res: Response, next: NextFunction)=> {
    //middleware di verifica dei dati dell'utente.

    try {
        const {username, password} = req.body

        if(!(username?.length > 3 || password?.length > 3)){
            return sendResponse(res, 400, "Utente non formato correttamente")
        }
        next()
    } catch (e) {
        console.error(e)
        return sendResponse(res, 400, "Utente non formato correttamente")
    }
}