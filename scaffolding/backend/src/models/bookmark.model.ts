import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

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
}
