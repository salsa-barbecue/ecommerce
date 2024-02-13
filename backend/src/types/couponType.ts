import {
    Association,
    HasManyAddAssociationMixin, HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    Model
} from "sequelize";
import {Coupon} from "./coupon";
import {CouponTypeXImage} from "./couponTypeXImage";
import {Image} from "./image";
import {CouponSize} from "./couponSize";
import {CouponTypeXCouponSize} from "./couponTypeXCouponSize";

export class CouponType extends Model {
    id!: string;
    title!: string;
    description!: string;
    coupons?: Coupon[];
    typeXImages?: CouponTypeXImage[];
    typeXSizes?: CouponTypeXCouponSize[];

    //codice necessario per l'associazione con sequelizer + typescripts
    public addImage!: HasManyAddAssociationMixin<Image, Image["id"]>;
    //codice necessario per l'associazione con sequelizer + typescripts
    public addCouponSize!: HasManyAddAssociationMixin<CouponSize, CouponSize["id"]>;
    public static associations: {
        images: Association<CouponType, Image>;
        couponSizes: Association<CouponType, CouponSize>
    };
}
