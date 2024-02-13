import {Response} from "express";

export default function sendResponse (res:Response, statusCode:number, msg:string, body:object = {}){
    //generatore di risposte dal quale passano tutte le risposte API

    return res.status(statusCode).json({
        msg: msg,
        data: body
    })
}