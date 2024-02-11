import {
    Association,
    BelongsToSetAssociationMixin,
    Model
} from "sequelize";
import {User} from "./user";
import {CouponType} from "./couponType";
import {CouponSize} from "./couponSize";
export class Coupon extends Model{
    id!: string;
    createdAt!: number;
    updatedAt!: number;
    isExpired!: boolean;
    user!: User;
    type!: CouponType;
    size!: CouponSize;

    //codice necessario per l'associazione con sequelizer + typescripts
    public setUser!: BelongsToSetAssociationMixin<User, User["id"]>;
    public setCouponType!: BelongsToSetAssociationMixin<CouponType, CouponType["id"]>
    public setCouponSize!: BelongsToSetAssociationMixin<CouponSize, CouponSize["id"]>
    public static associations: {
        users: Association<Coupon, User>;
        coupontypes: Association<Coupon, CouponType>,
        couponsizes: Association<Coupon, CouponSize>
    };
}