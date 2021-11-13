import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ProductAttributes {

    productId: number;
    title: string;
    description: string;
    productImage: string;
    categoryId: number;
    price: number;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {

    productId: number;
    title: string;
    description: string;
    productImage: string;
    categoryId: number;
    price: number;

    public static initialize(sequelize: Sequelize ) {
        Product.init(
            {
                productId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                categoryId: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                productImage : {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                price : {
                    type: DataTypes.FLOAT,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'products'
            }
        );
    }
}
