import {
    Association,
    HasManyAddAssociationMixin, HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    Model
} from "sequelize";
import {Coupon} from "./coupon";
import {Coupon_type_x_image} from "./coupon_type_x_image";
import {Image} from "./image";

export class Coupon_type extends Model {
    id!: string;
    title!: string;
    description!: string;
    coupons?: Coupon[];
    typeXImages?: Coupon_type_x_image[];

    //codice necessario per l'associazione con sequelizer + typescripts
    public getImages!: HasManyGetAssociationsMixin<Image>;
    public createImage!: HasManyCreateAssociationMixin<Image>;
    public addImage!: HasManyAddAssociationMixin<Image, Image["id"]>;
    public readonly images?: Image[];
    public static associations: {
        images: Association<Coupon_type, Image>;
    };
}
