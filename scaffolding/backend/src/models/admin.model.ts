import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface AdminAttributes {
    adminId: number;
    userId: number;
}

export interface AdminCreationAttributes extends Optional<AdminAttributes, 'adminId'> { }

export class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {

    adminId!: number;
    userId!: number;

    public static initialize(sequelize: Sequelize) {
        Admin.init(
            {
                adminId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                userId: {
                    type: DataTypes.INTEGER,
                    primaryKey: false,
                    allowNull: false,
                    unique: true
                }
            },
            {
                sequelize,
                tableName: 'admins'
            }
        );
    }

    // TODO: Create association and add both the class and association to the server.ts
}
