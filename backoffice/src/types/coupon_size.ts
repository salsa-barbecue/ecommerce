import {Model} from "sequelize";
import {Coupon} from "./coupon";

export class Coupon_size extends Model {
    id!: string;
    value!: number;
    title!: string;
    coupons?: Coupon[];
}