import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface UserAttributes {
    userId: number;
    userName: string;
    password: string;
    admin: boolean;
    firstname: string;
    lastname: string;
    email: string;
    street: string;
    zip: number;
    city: string;
    birthdate: string;
    telephone: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userName!: string;
    password!: string;
    admin!: boolean;
    firstname: string;
    lastname: string;
    email: string;
    street: string;
    zip: number;
    city: string;
    birthdate: string;
    telephone: number;

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
            firstname: {
                type: DataTypes.STRING,
                allowNull: true
                },
            lastname: {
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
            zip: {
                type: DataTypes.INTEGER,
                allowNull: true
                },
            city: {
                type: DataTypes.STRING,
                allowNull: true
                },
            birthdate: {
                type: DataTypes.STRING,
                allowNull: true
                },
            telephone: {
                type: DataTypes.INTEGER,
                allowNull: true
                },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
}
