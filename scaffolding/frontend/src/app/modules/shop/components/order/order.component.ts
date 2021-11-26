import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../core/http/user.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../models/user.model";
import {environment} from "../../../../../environments/environment";
import {ProductItem} from "../../../../models/product-item.model";
import {CartService} from "../../services/cart.service";
import {FormControl} from "@angular/forms";
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    loggedIn: boolean;
    user: User | null;
    paymentMethod: string = 'Invoice';
    products: ProductItem[]=[];
    productIds: number[]=[];
    addressExists: boolean = false;
    newStreet: string = '';
    newCity: string = '';
    newZipCode: string = '';
    newHouseNr: number = 0;
    newAddress: string = '';
    wasOrderSubmitted: boolean = false;
    totalPrice: number = 0;


    constructor(public cartService: CartService, public userService: UserService, public httpClient: HttpClient) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);
        cartService.products$.subscribe(res => this.products = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
        this.products = this.cartService.getProducts();

        this.setProductIds();
        this.setAddressExists();
        this.computeTotalPrice();
        this.invokeStripe();

    }

  ngOnInit(): void {
  }

  setProductIds(): void{
      for (var val of this.products){
          this.productIds.push(val.product.productId);
      }
  }

  setAddressExists(): void{

        if(this.user?.city == '' || this.user?.zipCode == '' || this.user?.street == '' || this.user?.housenr == 0){
            this.addressExists = false;
        }else{
            this.addressExists = true;
        }

  }
    setNewAddress():void{
        this.newAddress = this.newStreet+ ','+this.newHouseNr+ ','+this.newCity+ ','+this.newZipCode+''
        console.log('this is the new Street:'+this.newStreet)
}
    submitOrder(): void{

        var submittedAddress='';

        if(this.addressExists){
            submittedAddress = this.user?.street + ','+ this.user?.housenr + ',' + this.user?.city + ',' + this.user?.zipCode
        }
        else{
            this.setNewAddress();
            submittedAddress = this.newAddress;
            console.log(submittedAddress)
        }

        if(!this.addressExists){
            if(window.confirm('Are sure you have filled in correct inputs for the address?')){
                this.httpClient.post(environment.endpointURL + "order/createOrder",{
                    customerId: this.user?.userId,
                    customerName: this.user?.userName,
                    paymentMethod: this.paymentMethod,
                    deliveryAddress: submittedAddress,
                    status: 'pending',
                    productIds: this.productIds
                }).subscribe((response: any) => {
                    },
                    (err: any) => {
                    }
                );
                console.log('submitted order')
            }
        }else{
            this.httpClient.post(environment.endpointURL + "order/createOrder",{
                customerId: this.user?.userId,
                customerName: this.user?.userName,
                paymentMethod: this.paymentMethod,
                deliveryAddress: submittedAddress,
                status: 'pending',
                productIds: this.productIds
            }).subscribe((response: any) => {
                },
                (err: any) => {
                }
            );
            console.log('submitted order')
            this.wasOrderSubmitted = true;
        }
  }

  payOrder(){
      this.makePayment();
  }

    makePayment() {
        const totalPrice = this.totalPrice;
        const httpClient = this.httpClient;
        const paymentHandler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_51JzfroDwNYe9Y3WcyjCtptJFt6slOlyMayQJWLfkINvxc9bAPoyQRZ0N4X8VIZOyUyuadq0ioNutyX8YXd6ASvw70067Nj7siO',
            locale: 'auto',
            token: function (stripeToken: any) {
                console.log(stripeToken.card);
                httpClient.post(environment.endpointURL + 'order/payment/stripe', {
                    amount: totalPrice,
                    token: stripeToken
                })
                    .subscribe( (res: any) => {
                        if (res.success) {
                            alert(res.status);
                        }
                }, (err: any) => {
                        alert('Unknown error while paying');
                    }
                );

            },
        });
        paymentHandler.open({
            name: 'InSync Payment',
            description: 'Pay your order',
            amount: this.totalPrice * 100,
            currency: 'chf',

        });
        console.log('Paid amount');
    }

    invokeStripe(){
        if(!window.document.getElementById('stripe-script')){
            const script = window.document.createElement('script');
            script.id = 'stripe.script';
            script.type = 'text/javascript';
            script.src = 'http://checkout.stripe.com/checkout.js';
            window.document.body.appendChild(script);
        }
    }

    computeTotalPrice(): void {
        let price = 0;
        for (const product of this.products ){
            price += product.quantity * product.product.price;
        }
        this.totalPrice = price;
    }
}

