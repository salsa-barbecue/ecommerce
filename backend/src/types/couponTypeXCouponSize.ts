import {Model} from "sequelize";
import {CouponType} from "./couponType";
import {CouponSize} from "./couponSize";

export class CouponTypeXCouponSize extends Model{
    //definizione per tabella di unione
    couponType!: CouponType;
    couponSize!: CouponSize;
}