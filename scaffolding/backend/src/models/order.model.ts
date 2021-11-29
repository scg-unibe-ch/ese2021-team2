import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {Product} from './product.model';

export interface OrderAttributes {

    orderId: number;
    customerId: number;
    customerName: string;
    paymentMethod: string;
    deliveryAddress: string;
    status: string;
    // productIds: number[];
    price: number;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'orderId'> { }

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {

    orderId: number;
    customerId: number;
    customerName: string;
    paymentMethod: string;
    deliveryAddress: string;
    status: string;
    // productIds: number[];
    price: number;

    public static initialize(sequelize: Sequelize ) {
        Order.init(
            {
                orderId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                customerId: {
                    type: DataTypes.INTEGER
                },
                price: {
                    type: DataTypes.INTEGER
                },
                customerName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                paymentMethod: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                status: {
                    type: DataTypes.ENUM('pending', 'shipped', 'cancelled') ,
                    allowNull: true
                },
                deliveryAddress : {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                // productIds : {
                //     type: DataTypes.ARRAY(DataTypes.INTEGER),
                //     allowNull: false
                // }
            },
            {
                sequelize,
                tableName: 'orders'
            }
        );
    }
}
