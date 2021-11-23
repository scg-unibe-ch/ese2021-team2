import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../core/http/user.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../models/user.model";
import {environment} from "../../../../../environments/environment";
import {ProductItem} from "../../../../models/product-item.model";
import {CartService} from "../../services/cart.service";

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
        //this.setAddressExists();

    }

  ngOnInit(): void {
  }

  setProductIds(): void{
      for (var val of this.products){
          this.productIds.push(val.product.productId);
      }
  }

  setAddressExists(): void{

        if(this.user?.city == null || this.user?.zipCode == null || this.user.street == null || this.user?.housenr == null){
            this.addressExists = false;
            console.log('user doesn\'t have a complete address')
        }else{
            this.addressExists = true;
            console.log('user has a complete address')
        }

  }

    submitOrder(): void{
        this.httpClient.post(environment.endpointURL + "order/createOrder",{
            customerId: this.user?.userId,
            customerName: this.user?.userName,
            paymentMethod: this.paymentMethod,
            deliveryAddress: this.user?.street + ','+ this.user?.housenr + ',' + this.user?.city + ',' + this.user?.zipCode,
            status: 'pending',
            productIds: this.productIds
        }).subscribe((response: any) => {
            },
            (err: any) => {
            }
        );
        console.log('submitted order')
  }

}

