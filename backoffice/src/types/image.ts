import {Model} from "sequelize";
import {CouponTypeXImage} from "./couponTypeXImage";

export class Image extends Model{
    id!: string;
    url!: string;
    couponTypeXImages?: CouponTypeXImage[];
}