import {Model} from "sequelize";
import {CouponType} from "./couponType";
import {Image} from "./image";

export class CouponTypeXImage extends Model{
    coupon_type!: CouponType;
    image!: Image;
}