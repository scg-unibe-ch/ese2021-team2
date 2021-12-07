import {Product} from "../../../../backend/src/models/product.model";

export class OrderModel {

    constructor(
        orderId: number,
        customerId: number,
        customerName: string,
        paymentMethod: string,
        deliveryAddress: string,
        status: string,
        products: Product[]
    ){}

}
