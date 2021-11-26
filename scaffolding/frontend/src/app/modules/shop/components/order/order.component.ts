import {Component, OnInit, SimpleChanges} from '@angular/core';
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
    newHouseNr: number = 1;
    newAddress: string = '';
    wasOrderSubmitted: boolean = false;
    userAddress?: string  = '';
    invalidZipCodeMsg: string= '';
    isZipCodeInvalid: boolean = true;
    isCityInvalid: boolean = true;
    invalidCityMsg: string = '';
    isStreetInvalid: boolean = true;
    invalidStreetMsg: string = '';
    isAddressInvalid: boolean = true;
    totalPrice: number;


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
        this.invokeStripe();
        if(this.user != null){
            this.setUserAddress();
        }
        this.computeTotalPrice();

    }

  ngOnInit(): void {
        if(this.addressExists){
            this.isAddressInvalid = false;
        }
  }


  setProductIds(): void{
      for (var val of this.products){
          for(let i = 1; i<=val.quantity;i++){
              this.productIds.push(val.product.productId);
          }
      }
  }

  setUserAddress(): void{
        this.userAddress = this.user?.street + ' ' + this.user?.housenr + ', ' + this.user?.city + ', ' + this.user?.zipCode
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
  }
    submitOrder(): void{

        var submittedAddress='';

        if(this.addressExists){
            submittedAddress = this.user?.street + ','+ this.user?.housenr + ',' + this.user?.city + ',' + this.user?.zipCode
        }
        else{
            this.setNewAddress();
            submittedAddress = this.newAddress;
        }

            this.httpClient.post(environment.endpointURL + "order/createOrder",{
                customerId: this.user?.userId,
                customerName: this.user?.userName,
                paymentMethod: this.paymentMethod,
                deliveryAddress: submittedAddress,
                status: 'pending',
                productIds: this.productIds,
                price: this.totalPrice
            }).subscribe((response: any) => {
                },
                (err: any) => {
                }
            );
            console.log('submitted order')
            this.wasOrderSubmitted = true;
        }

    checkNewZipCode(): void{
        this.isZipCodeInvalid = false;
        let invalidFormat = false;
        const toCheck: string = this.newZipCode;

        try {
            if (toCheck.trim().length >= 5 || toCheck.length <= 3) {
                invalidFormat = true;
                this.invalidZipCodeMsg = 'The Zip Code should be 4 Digits!';
            }
            else if (isNaN(+toCheck)) {
                invalidFormat = true;
                this.invalidZipCodeMsg = 'The Zip Code may only contain Numbers!';
            }

        } finally {
            this.isZipCodeInvalid = invalidFormat;
            this.checkNewAddress();
        }
    }

    checkNewCity(): void{
        this.isCityInvalid = false;
        let invalidFormat = false;
        const toCheck: string = this.newCity;

        try {
            if ((/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~1234567890]/.test(toCheck))) {
                invalidFormat = true;
                this.invalidCityMsg = 'The city should only contain letters!';
            }

        } finally {
            this.isCityInvalid = invalidFormat;
            this.checkNewAddress();
        }
    }
    checkNewStreet(): void{
        this.isStreetInvalid = false;
        let invalidFormat = false;
        const toCheck: string = this.newStreet;

        try {
            if ((/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~1234567890]/.test(toCheck))) {
                invalidFormat = true;
                this.invalidStreetMsg = 'The city should only contain letters!';
            }

        } finally {
            this.isStreetInvalid = invalidFormat;
            this.checkNewAddress();
        }
    }

    checkNewAddress(): void{
        this.isAddressInvalid = this.isCityInvalid || this.isStreetInvalid || this.isZipCodeInvalid
    }
    computeTotalPrice(): void {
        let price = 0;
        for (const product of this.products ){
            price += product.quantity * product.product.price;
        }
        this.totalPrice = price;
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

}

