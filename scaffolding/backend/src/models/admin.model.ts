import { User } from './user.model';
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
    public static createAssociations() {
        Admin.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }
}
