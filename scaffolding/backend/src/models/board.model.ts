import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface BoardCreationRequest {
    subjectId: number;
    boardName: string;
    description: string;
}

export interface BoardAttributes {
    boardId: number;
    subjectId: number;
    boardName: string;
    description: string;
    ownerId: number;
}

export interface BoardCreationAttributes extends Optional<BoardAttributes, 'boardId'> { }

export class Board extends Model<BoardAttributes, BoardCreationAttributes> implements BoardAttributes {

    boardId: number;
    subjectId!: number;
    boardName!: string;
    description!: string;
    ownerId!: number;

    public static initialize(sequelize: Sequelize) {
        Board.init(
            {
                boardId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                subjectId: {
                    type: DataTypes.INTEGER,
                    primaryKey: false,
                    allowNull: false
                },
                boardName: {
                    type: DataTypes.STRING,
                    primaryKey: false,
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING,
                    primaryKey: false
                },
                ownerId: {
                    type: DataTypes.INTEGER,
                    primaryKey: false,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'boards'
            }
        );
    }
}
