import {ProductItem} from "./product-item.model";

export class Order {

    constructor(
        public orderId: number,
        public customerId: number,
        public customerName: string,
        public paymentMethod: string,
        public deliveryAddress: string,
        public status: string,
        public productItems: ProductItem[],
        public price: number
    ){}

}
