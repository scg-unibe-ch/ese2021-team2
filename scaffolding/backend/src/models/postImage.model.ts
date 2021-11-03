import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Post } from './post.model';

export interface PostImageAttributes {
    imageId: number;
    fileName: string;
    postId: number;
}

export interface PostImageCreationAttributes extends Optional<PostImageAttributes, 'imageId'> { }

export class PostImage extends Model<PostImageAttributes, PostImageCreationAttributes> implements PostImageAttributes {
    public static associations: {
        img: Association<Post, PostImage>;
    };

    imageId!: number;
    fileName!: string;
    postId!: number;

    public static initialize(sequelize: Sequelize) {
        PostImage.init(
            {
                imageId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                fileName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                postId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {tableName: 'postImages', sequelize}
        );
    }

    public static createAssociations() {
        PostImage.belongsTo(Post, {
           targetKey: 'postId' ,
           as: 'post',
           onDelete: 'cascade',
           foreignKey: 'postId'
        });
    }
}
