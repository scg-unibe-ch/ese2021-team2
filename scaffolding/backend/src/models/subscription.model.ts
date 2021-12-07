import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface SubAttributes {
    boardId: number;
    userId: number;
    subId: number;
}

export interface LikeCreationAttributes extends Optional<SubAttributes, 'subId'> { }

export class Subscription extends Model<SubAttributes, LikeCreationAttributes> implements SubAttributes {

    boardId: number;
    userId: number;
    subId: number;


    public static initialize(sequelize: Sequelize) {
        Subscription.init(
            {
                boardId: {
                    type: DataTypes.INTEGER,

                },
                userId: {
                    type: DataTypes.INTEGER,

                }
                ,
                subId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                }
            },
            {
                sequelize,
                tableName: 'subscriptions'
            }
        );
    }
}
