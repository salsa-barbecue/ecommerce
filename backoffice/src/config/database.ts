import {DataTypes, Sequelize} from "sequelize";
import {User} from "../types/user";
import {Coupon} from "../types/coupon";
import {Coupon_type} from "../types/coupon_type";
import {Image} from "../types/image";
import {Coupon_size} from "../types/coupon_size";
import {InitialSizes, InitialImages, InitialTypes, InitialTypeImageRelations} from "./initialData";
import {Coupon_type_x_image} from "../types/coupon_type_x_image";

export const sequelize = new Sequelize("mysql://root:123456789@localhost:3306/db_ecommerce")

export const initializeDatabase = async () => {
    User.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "User"
    })

    Coupon.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        isExpired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "Coupon"
    })

    Coupon_type.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "CouponType",
        timestamps: false
    })

    Coupon_size.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "CouponSize",
        timestamps: false
    })

    Image.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Image",
        timestamps: false
    })

    Coupon.belongsTo(Coupon_type);
    Coupon.belongsTo(Coupon_size);
    Coupon.belongsTo(User);
    Coupon_type.hasMany(Coupon)
    Coupon_size.hasMany(Coupon)
    User.hasMany(Coupon)

    Coupon_type_x_image.init({}, {
        sequelize,
        modelName: "CouponTypeXImage",
        timestamps: false
    })
    Coupon_type.belongsToMany(Image, {through: Coupon_type_x_image})
    Image.belongsToMany(Coupon_type, {through: Coupon_type_x_image})

    await sequelize.sync({force: true})
}

export const initializeData = async () => {
    try{
        const createdImages:Image[] = await Image.bulkCreate(InitialImages)
        const createdTypes:Coupon_type[] = await Coupon_type.bulkCreate(InitialTypes)
        const createdSizes:Coupon_size[] = await Coupon_size.bulkCreate(InitialSizes)

        for(let i in InitialTypeImageRelations){
            let relation = InitialTypeImageRelations[i]
            let type = createdTypes.find(el => el.dataValues.id === relation.CouponTypeId)
            let image = createdImages.find(el => el.dataValues.id === relation.ImageId)

            if(type && image){
                await type.addImage(image)
            }
        }

        return true
    } catch (e) {
        return false
    }
}