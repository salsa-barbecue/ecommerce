import {DataTypes, Sequelize} from "sequelize";
import {User} from "../types/user";

export const sequelize = new Sequelize( "mysql://root:123456789@localhost:3306/db_ecommerce")

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

    await sequelize.sync({force: true})
}
