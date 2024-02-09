import {Model} from "sequelize";
import {Coupon_type} from "./coupon_type";
import {Image} from "./image";

export class Coupon_type_x_image extends Model{
    coupon_type!: Coupon_type;
    image!: Image;
}