import {DataTypes, Sequelize} from "sequelize";
import {User} from "../types/user";
import {Coupon} from "../types/coupon";
import {Coupon_type} from "../types/coupon_type";
import {Image} from "../types/image";
import {Coupon_size} from "../types/coupon_size";

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
        modelName: "Coupon_type"
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
        modelName: "Coupon_size"
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
        modelName: "Image"
    })

    Coupon.belongsTo(Coupon_type);
    Coupon.belongsTo(Coupon_size);
    Coupon.belongsTo(User);
    Coupon_type.hasMany(Coupon)
    Coupon_size.hasMany(Coupon)
    User.hasMany(Coupon)

    Coupon_type.belongsToMany(Image, {through: "CouponTypeXImage"})
    Image.belongsToMany(Coupon_type, {through: "CouponTypeXImage"})

    await sequelize.sync({force: true})
}
