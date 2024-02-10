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
    public getImages!: HasManyGetAssociationsMixin<Image>;
    public createImage!: HasManyCreateAssociationMixin<Image>;
    public addImage!: HasManyAddAssociationMixin<Image, Image["id"]>;
    public readonly images?: Image[];

    //codice necessario per l'associazione con sequelizer + typescripts
    public getCouponSizes!: HasManyGetAssociationsMixin<CouponSize>;
    public createCouponSize!: HasManyCreateAssociationMixin<CouponSize>;
    public addCouponSize!: HasManyAddAssociationMixin<CouponSize, CouponSize["id"]>;
    public readonly couponSizes?: CouponSize[];
    public static associations: {
        images: Association<CouponType, Image>;
        couponSizes: Association<CouponType, CouponSize>
    };
}
