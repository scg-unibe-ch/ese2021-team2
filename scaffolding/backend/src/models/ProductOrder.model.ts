import {Association, DataTypes, Model, Sequelize} from 'sequelize';
import {Product} from './product.model';
import {Order} from './order.model';

export interface ProductOrderAttributes {
    productId: number;
    orderId: number;
    quantity: number;
}

export interface ProductItemAttributes {
    product: Product;
    quantity: number;
}


export class ProductOrder extends Model<ProductOrderAttributes> implements ProductOrderAttributes {
    public static associations: {
        prodOrders: Association<Product, Order>;
    };

    productId!: number;
    orderId!: number;
    quantity!: number;

    public static initialize(sequelize: Sequelize) {
        ProductOrder.init(
            {
                productId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                orderId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {tableName: 'productOrder', sequelize}
        );
    }

    public static createAssociations() {
        ProductOrder.belongsTo(Product, {
            targetKey: 'productId',
            as: 'product',
            onDelete: 'cascade',
            foreignKey: 'productId'
        });
        ProductOrder.belongsTo(Order, {
            targetKey: 'orderId',
            as: 'order',
            onDelete: 'cascade',
            foreignKey: 'orderId'
        });
    }
}
