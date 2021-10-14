import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { stringify } from 'querystring';

export interface UserAttributes {
    userId: number;
    userName: string;
    password: string;
    admin: boolean;
    fname: string;
    lname: string;
    email: string;
    street: string;
    housenr: number;
    zipCode: string;
    city: string;
    birthday: Date;
    phonenumber: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userName!: string;
    password!: string;
    admin!: boolean;
    fname!: string;
    lname!: string;
    email!: string;
    street!: string;
    housenr!: number;
    zipCode!: string;
    city!: string;
    birthday!: Date;
    phonenumber!: string;

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            fname: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lname: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            street: {
                type: DataTypes.STRING,
                allowNull: true
            },
            housenr: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            zipCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true
            },
            birthday: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phonenumber: {
                type: DataTypes.STRING,
                allowNull: true
            }


        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
}


