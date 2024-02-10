import {DataTypes, Sequelize} from "sequelize";
import {User} from "../types/user";
import {Coupon} from "../types/coupon";
import {CouponType} from "../types/couponType";
import {Image} from "../types/image";
import {CouponSize} from "../types/couponSize";
import {
    InitialSizes,
    InitialImages,
    InitialTypes,
    InitialTypeImageRelations,
    InitialTypeSizeRelations
} from "./initialData";
import {CouponTypeXImage} from "../types/couponTypeXImage";
import {CouponTypeXCouponSize} from "../types/couponTypeXCouponSize";

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

    CouponType.init({
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

    CouponSize.init({
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

    Coupon.belongsTo(CouponType);
    Coupon.belongsTo(CouponSize);
    Coupon.belongsTo(User);
    CouponType.hasMany(Coupon)
    CouponSize.hasMany(Coupon)
    User.hasMany(Coupon)

    CouponTypeXCouponSize.init({}, {
        sequelize,
        modelName: "CouponTypeXCouponSize",
        timestamps: false
    })
    CouponType.belongsToMany(CouponSize, {through: CouponTypeXCouponSize})
    CouponSize.belongsToMany(CouponType, {through: CouponTypeXCouponSize})

    CouponTypeXImage.init({}, {
        sequelize,
        modelName: "CouponTypeXImage",
        timestamps: false
    })
    CouponType.belongsToMany(Image, {through: CouponTypeXImage})
    Image.belongsToMany(CouponType, {through: CouponTypeXImage})

    await sequelize.sync({force: true})
}

export const initializeData = async () => {
    try{
        const createdImages:Image[] = await Image.bulkCreate(InitialImages)
        const createdTypes:CouponType[] = await CouponType.bulkCreate(InitialTypes)
        const createdSizes:CouponSize[] = await CouponSize.bulkCreate(InitialSizes)

        for(let i in InitialTypeImageRelations){
            let relation = InitialTypeImageRelations[i]
            let type = createdTypes.find(el => el.dataValues.id === relation.CouponTypeId)
            let image = createdImages.find(el => el.dataValues.id === relation.ImageId)

            if(type && image){
                await type.addImage(image)
            }
        }

        for(let i in InitialTypeSizeRelations){
            let relation = InitialTypeSizeRelations[i]
            let type = createdTypes.find(el => el.dataValues.id === relation.CouponTypeId)
            let size = createdSizes.find(el => el.dataValues.id === relation.CouponSizeId)

            if(type && size){
                await type.addCouponSize(size)
            }
        }

        return true
    } catch (e) {
        console.error(e)
        return false
    }
}