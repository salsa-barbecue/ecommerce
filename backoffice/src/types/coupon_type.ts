import {Model} from "sequelize";
import {Coupon} from "./coupon";
import {Coupon_type_x_image} from "./coupon_type_x_image";

export class Coupon_type extends Model {
    id!: string;
    title!: string;
    description!: string;
    coupons?: Coupon[];
    images?: Coupon_type_x_image[];
}
