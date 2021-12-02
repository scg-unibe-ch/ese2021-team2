import {Association, DataTypes, Model, Optional, Sequelize} from 'sequelize';
import {Product} from './product.model';

export interface ProductImageAttributes {
    imageId: number;
    fileName: string;
    productId: number;
}

export interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, 'imageId'> { }

export class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
    public static associations: {
        img: Association<Product, ProductImage>;
    };

    imageId!: number;
    fileName!: string;
    productId!: number;

    public static initialize(sequelize: Sequelize) {
        ProductImage.init(
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
                productId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {tableName: 'productImages', sequelize}
        );
    }

    public static createAssociations() {
        ProductImage.belongsTo(Product, {
           targetKey: 'productId' ,
           as: 'product',
           onDelete: 'cascade',
           foreignKey: 'productId'
        });
    }
}
