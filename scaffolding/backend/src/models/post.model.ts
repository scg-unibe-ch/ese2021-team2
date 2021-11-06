
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface PostAttributes {
    postId: number;
    title: string;
    content: string;
    likes: number;
    date: string;
    boardId: number;
    creatorId: number;
    semester: string;
    postImage: string;
}

export interface PostCreationAttributes extends Optional<PostAttributes, 'postId'> { }

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {

    postId: number;
    title: string;
    content: string;
    likes: number;
    date: string;
    boardId: number;
    creatorId: number;
    semester: string;
    postImage: string;

    public static initialize(sequelize: Sequelize) {
        Post.init(
            {
                postId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                title: {
                    type: DataTypes.STRING,
                },
                content: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                likes: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                date: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                boardId: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                creatorId: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                semester: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                postImage : {
                    type: DataTypes.STRING,
                    allowNull: true
                }
            },

            {
                sequelize,
                tableName: 'posts'
            }
        );
    }
}
