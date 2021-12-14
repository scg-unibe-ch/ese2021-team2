import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface LikeAttributes {
    postId: number;
    userId: number;
    likeId: number;
}

export interface LikeCreationAttributes extends Optional<LikeAttributes, 'postId'> { }

export class Like extends Model<LikeAttributes, LikeCreationAttributes> implements LikeAttributes {

    postId: number;
    userId: number;
    likeId: number;


    public static initialize(sequelize: Sequelize) {
        Like.init(
            {
                postId: {
                    type: DataTypes.INTEGER,

                },
                userId: {
                    type: DataTypes.INTEGER,

                }
                ,
                likeId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                }
            },
            {
                sequelize,
                tableName: 'likes'
            }
        );
    }
}
