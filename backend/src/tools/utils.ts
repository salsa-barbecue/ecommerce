import {Response} from "express";

export default function sendResponse (res:Response, statusCode:number, msg:string, body:object = {}){
    return res.status(statusCode).json({
        msg: msg,
        data: body
    })
}