import {Model} from "sequelize";
import {Coupon_type_x_image} from "./coupon_type_x_image";

export class Image extends Model{
    id!: string;
    url!: string;
    coupon_types_x_images?: Coupon_type_x_image[];
}