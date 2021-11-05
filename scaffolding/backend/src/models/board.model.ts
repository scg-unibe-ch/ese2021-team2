import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface BoardAttributes {
    subjectId: number;
    boardId: number;
    boardName: string;
    description: string;
}

export interface BoardCreationAttributes extends Optional<BoardAttributes, 'boardId'> { }

export class Board extends Model<BoardAttributes, BoardCreationAttributes> implements BoardAttributes {

    subjectId!: number;
    boardId!: number;
    boardName!: string;
    description!: string;

    public static initialize(sequelize: Sequelize) {
        Board.init(
            {
                boardId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                subjectId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                boardName: {
                    type: DataTypes.STRING,
                    primaryKey: false
                },
                description: {
                    type: DataTypes.STRING,
                    primaryKey: false
        }
    },
            {
                sequelize,
                tableName: 'boards'
            }
        );
    }
}
