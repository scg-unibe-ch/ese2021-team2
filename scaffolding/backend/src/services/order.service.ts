import { Order } from '../models/order.model';


export class OrderService {
    public createOrder(order: Order) {
        return Order.create(order)
            .then(inserted => Promise.resolve(inserted))
            .catch(err => Promise.reject(err));
    }


}
