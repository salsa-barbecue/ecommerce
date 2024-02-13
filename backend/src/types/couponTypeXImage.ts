import {Model} from "sequelize";
import {CouponType} from "./couponType";
import {Image} from "./image";

export class CouponTypeXImage extends Model{
    //definizione per tabella di unione
    couponType!: CouponType;
    image!: Image;
}