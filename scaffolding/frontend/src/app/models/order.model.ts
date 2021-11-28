export class Order {
    products: number[];

    constructor(
        orderId: number,
        customerId: number,
        customerName: string,
        paymentMethod: string,
        deliveryAddress: string,
        status: string,
        products: number[],
        price: number
    ){this.products=products;}

}
