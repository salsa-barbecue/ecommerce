import {Model} from "sequelize";
import {CouponType} from "./couponType";
import {CouponSize} from "./couponSize";

export class CouponTypeXCouponSize extends Model{
    couponType!: CouponType;
    couponSize!: CouponSize;
}