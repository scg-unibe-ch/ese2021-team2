import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface PostCommentAttributes {
    postCommentId: number;
    postId: number;
    commentText: string;
    userId: number;
    userName: string;
}

export interface BoardCreationAttributes extends Optional<PostCommentAttributes, 'postCommentId'> { }

export class PostComment extends Model<PostCommentAttributes, BoardCreationAttributes> implements PostCommentAttributes {

    postCommentId!: number;
    postId!: number;
    userId!: number;
    commentText!: string;
    userName!: string;

    public static initialize(sequelize: Sequelize) {
        PostComment.init(
            {
                postId: {
                    type: DataTypes.INTEGER,
                    primaryKey: false,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: false
                },
                postCommentId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                commentText: {
                    type: DataTypes.STRING,
                    primaryKey: false,
                    allowNull: false
                },
                userName: {
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
