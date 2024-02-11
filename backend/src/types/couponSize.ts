import {Model} from "sequelize";
import {Coupon} from "./coupon";

export class CouponSize extends Model {
    id!: string;
    value!: number;
    title!: string;
    coupons?: Coupon[];
}