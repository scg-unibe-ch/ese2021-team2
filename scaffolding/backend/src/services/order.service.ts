import { Order } from '../models/order.model';
import {ProductItemAttributes, ProductOrder} from '../models/ProductOrder.model';
import {Product} from '../models/product.model';



export class OrderService {
    public async createOrder(order: Order, productItems: ProductItemAttributes[]): Promise<Order> {
        try {
            const created: Order = await Order.create(order);
            await this.addProductsToOrder(created.orderId, productItems);
            return order;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    private async addProductsToOrder(orderId: number, productItems: ProductItemAttributes[]): Promise<string> {
        try {
            for (let i = 0; i < productItems.length; i++) {
                await ProductOrder.create({
                    orderId: orderId,
                    productId: productItems[i].product.productId,
                    quantity: productItems[i].quantity,
                });
            }
            return Promise.resolve('Inserted into OrderProducts');

        } catch (err) {
            return Promise.reject(err);
        }
    }

    public getOrdersOfUser(userId: number): Promise<Order[]> {
        return Order.findAll({
            where: {
                customerId: userId,
            },
            order: [['createdAt', 'DESC']]
        });
    }
    public getAllOrders() {
        return Order.findAll({
            order: [['createdAt', 'DESC']]
        });
    }

    public getOrder(orderId: number): Promise<Order> {
        return Order.findByPk(orderId);
    }

    public updateOrder(order: Order): Promise<Order> {
        return Order.update(order, {
            where: {
                orderId: order.orderId
            }
        })
            .then(updated => {
                return Promise.resolve(order);
            })
            .catch(err => {
                console.log(err);
                return Promise.reject(err);
            });
    }


    public async getOrderProductItems(orderId: number): Promise<ProductItemAttributes[]> {
        try {
            const prodItems: ProductItemAttributes[] = [];
            const prodOrders = await ProductOrder.findAll({
                where: {
                    orderId: orderId
                }
            });
            for ( let i = 0; i < prodOrders.length; i++ ) {
                const product: Product = await Product.findByPk(prodOrders[i].productId);
                prodItems.push({product: product, quantity: prodOrders[i].quantity});
            }
            return Promise.resolve(prodItems);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
