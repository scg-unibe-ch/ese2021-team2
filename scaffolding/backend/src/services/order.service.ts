import { Order } from '../models/order.model';


export class OrderService {
    public createOrder(order: Order) {
        return Order.create(order)
            .then(inserted => Promise.resolve(inserted))
            .catch(err => Promise.reject(err));
    }


    public getOrdersOfUser(userId: number): Promise<Order[]> {
        console.log('Getting orders of ' + userId);
        return Order.findAll({
            where: {
                customerId: userId,
            },
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
}
