import { Request, Response} from "express";
import {User} from "../types/user";
import {v4} from "uuid";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import sendResponse from "../tools/utils";
import {LoginResponseDTO} from "../types/dto/loginResponse";

const createUserRoute = async (req: Request, res: Response) => {

    const {username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.build({
        id: v4(),
        username: username,
        password: hashedPassword,
    })
    try {
        await newUser.save()
        return sendResponse(res, 200, "User created")
    } catch (e) {
        return sendResponse(res, 400, "Error in creating user")
    }
}

const loginUserRoute = async (req: Request, res: Response) => {
    const {username, password} = req.body
    const currentUser = await User.findOne({where: {username: username}})
    if (!currentUser) return sendResponse(res, 401, "Login error")

    const passwordComparison: boolean = await bcrypt.compare(password, currentUser.password)
    if (!passwordComparison) return sendResponse(res, 401, "Login error")

    const token = jwt.sign({
        user_id: currentUser.id,
    }, process.env.SECRET_KEY || '123456789')

    const responseData:LoginResponseDTO = {token: token}

    return sendResponse(res, 200, "Login successful", responseData)
}

export default {createUserRoute, loginUserRoute}