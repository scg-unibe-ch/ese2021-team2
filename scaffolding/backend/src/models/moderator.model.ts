import { Board } from './board.model';
import { User } from './user.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ModeratorAttributes {
    moderatorId: number;
    userId: number;
    boardId: number;
}

export interface ModeratorCreationAttributes extends Optional<ModeratorAttributes, 'moderatorId'> { }

export class Moderator extends Model<ModeratorAttributes, ModeratorCreationAttributes> implements ModeratorAttributes {

    moderatorId!: number;
    userId!: number;
    boardId!: number;

    public static initialize(sequelize: Sequelize) {
        Moderator.init(
            {
                moderatorId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                userId: {
                    type: DataTypes.INTEGER,
                    primaryKey: false,
                    allowNull: false
                },
                boardId: {
                    type: DataTypes.INTEGER,
                    primaryKey: false,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'moderators'
            }
        );
    }
    public static createAssociations() {
        Moderator.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
        Moderator.belongsTo(Board, {
            targetKey: 'boardId',
            as: 'board',
            onDelete: 'cascade',
            foreignKey: 'boardId'
        });
    }
}
