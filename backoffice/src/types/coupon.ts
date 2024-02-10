import {Model} from "sequelize";
import {User} from "./user";
import {Coupon_type} from "./coupon_type";
import {Coupon_size} from "./coupon_size";
export class Coupon extends Model{
    id!: string;
    createdAt!: number;
    updatedAt!: number;
    isExpired!: boolean;
    user!: User;
    type!: Coupon_type;
    size!: Coupon_size;
}