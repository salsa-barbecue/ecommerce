import { Request, Response} from "express";
import {Coupon} from "../types/coupon";
import {v4} from "uuid";
import sendResponse from "../tools/utils";
import {Coupon_type} from "../types/coupon_type";
import {Image} from "../types/image";

const createCouponRoute = async (req: Request, res: Response) => {
    const {user_id, type_id, size_id} = req.body
    const newCoupon = Coupon.build({
        id: v4(),
        is_expired: false,
        UserId: user_id,
        CouponTypeId: type_id,
        CouponSizeId: size_id
    })

    try {
        await newCoupon.save()
        return sendResponse(res, 200, "Coupon created", newCoupon)
    } catch (e) {
        return sendResponse(res, 400, "Error in creating coupon")
    }
}

const listCouponsRoute = (req: Request, res: Response) => {

}

const listAvailableCouponsRoute = async (req: Request, res: Response) => {
    console.log(req.body)
    try{
        const couponList = await Coupon_type.findAll({include: Image});
        return sendResponse(res, 200, "data", couponList)
    } catch (e) {
        return sendResponse(res, 400, "Error in retrieving coupon")
    }



}
export default {createCouponRoute, listCouponsRoute, listAvailableCouponsRoute}