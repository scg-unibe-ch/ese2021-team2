
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface LikeAttributes {
    postId: number;
    userId: number;

}


export interface LikeCreationAttributes extends Optional<LikeAttributes, 'postId'> { }



export class Like extends Model<LikeAttributes, LikeCreationAttributes> implements LikeAttributes {

    postId: number;
    userId: number;




    public static initialize(sequelize: Sequelize) {
        Like.init({
            postId: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true
            }
        },
            {
                sequelize,
                tableName: 'likes'
            }
        );
    }
}
