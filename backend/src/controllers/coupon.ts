import {Request, Response} from "express";
import {Coupon} from "../types/coupon";
import {v4} from "uuid";
import sendResponse from "../tools/utils";
import {CouponType} from "../types/couponType";
import {Image} from "../types/image";
import {CouponSize} from "../types/couponSize";
import {ListCouponResponseDTO} from "../types/dto/listCouponResponse";
import {ListCouponTypesResponseDTO} from "../types/dto/listCouponTypesResponse";
import {CreateCouponResponseDTO} from "../types/dto/createCouponResponse";

const createCouponRoute = async (req: Request, res: Response) => {
    const {user_id, type_id, size_id} = req.body

    try {
        const newCoupon = Coupon.build({
            id: v4(),
            isExpired: false,
        })

        await newCoupon.setCouponType(type_id);
        await newCoupon.setCouponSize(size_id);
        await newCoupon.setUser(user_id);
        await newCoupon.save()

        const responseData:CreateCouponResponseDTO = {
            newCoupon: newCoupon
        }

        return sendResponse(res, 200, "Coupon created", responseData)
    } catch (e) {
        console.error(e)
        return sendResponse(res, 400, "Error in creating coupon")
    }
}

const listCouponsRoute = async (req: Request, res: Response) => {
    const {user_id} = req.body
    try {
        const couponList = await Coupon.findAll({
            include: [{model: CouponType, include: [Image]}, CouponSize],
            where: {UserId: user_id}
        });
        const responseData:ListCouponResponseDTO = {
            userCoupons: couponList,
            count: couponList.length
        }
        return sendResponse(res, 200, "data", responseData)
    } catch (e) {
        console.error(e)
        return sendResponse(res, 400, "Error in retrieving coupon")
    }
}

const listAvailableCouponsRoute = async (req: Request, res: Response) => {
    try {
        const couponList = await CouponType.findAll({include: [Image, CouponSize]});
        const responseData:ListCouponTypesResponseDTO = {
            availableCoupons: couponList
        }
        return sendResponse(res, 200, "data", responseData)
    } catch (e) {
        console.error(e)
        return sendResponse(res, 400, "Error in retrieving coupon")
    }
}
export default {createCouponRoute, listCouponsRoute, listAvailableCouponsRoute}