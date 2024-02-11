import {Model} from "sequelize";

export class User extends Model{
    id!: string;
    username!: string;
    password!: string;
}