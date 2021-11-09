import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface PostCommentAttributes {
    postCommentId: number;
    postId: number;
    commentText: string;
}

export interface BoardCreationAttributes extends Optional<PostCommentAttributes, 'postCommentId'> { }

export class PostComment extends Model<PostCommentAttributes, BoardCreationAttributes> implements PostCommentAttributes {

    postCommentId!: number;
    postId!: number;
    commentText!: string;

    public static initialize(sequelize: Sequelize) {
        PostComment.init(
            {
                postId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                postCommentId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                commentText: {
                    type: DataTypes.STRING,
                    primaryKey: false,
                    allowNull: false
                },
            },
            {
                sequelize,
                tableName: 'comments'
            }
        );
    }
}
