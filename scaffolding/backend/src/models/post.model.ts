import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {Bookmark} from './bookmark.model';

export interface PostAttributes {
    postId: number;
    title: string;
    content: string;
    likes: number;
    date: string;
    boardId: number;
    creatorId: number;
    semester: string;
    category: string;
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
    category: string;
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
                    type: DataTypes.INTEGER,
                    allowNull: true
                },
                date: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                boardId: {
                    type: DataTypes.INTEGER,
                    allowNull: true
                },
                creatorId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                semester: {
                    type: DataTypes.ENUM('1.Semester', '2.Semester', '3.Semester', '4.Semester', '5.Semester', '6.Semester'),
                    allowNull: true
                },
                category: {
                    type: DataTypes.ENUM('organization', 'exercises', 'exams', 'other') ,
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
    public static createAssociations() {
        Post.hasMany(Bookmark, {
            foreignKey: 'postId',
            onDelete: 'cascade'
        });
    }
}
