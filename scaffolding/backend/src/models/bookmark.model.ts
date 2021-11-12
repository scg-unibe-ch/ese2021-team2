import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {Post} from './post.model';
import {User} from './user.model';

export interface BookmarkAttributes {
    postId: number;
    userId: number;
}


export class Bookmark extends Model<BookmarkAttributes> implements BookmarkAttributes {

    postId: number;
    userId: number;

    public static initialize(sequelize: Sequelize) {
       Bookmark.init(
            {
                postId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                userId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                }
            },
            {
                sequelize,
                tableName: 'bookmarks'
            }
        );
    }
    public static createAssociations() {
        Bookmark.belongsTo(Post, {
            targetKey: 'postId' ,
            as: 'post',
            onDelete: 'cascade',
            foreignKey: 'postId'
        });
        Bookmark.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }
}
