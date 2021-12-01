import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../../models/order.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../../core/http/user.service";
import {User} from "../../../../../models/user.model";
import {environment} from "../../../../../../environments/environment";
import {ProductItem} from "../../../../../models/product-item.model";
import {Product} from "../../../../../models/product.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

    authorized: boolean = false;
    user: User | null;
    order: Order = new Order(0,-1,"","","","", [],0);
    productItems: ProductItem[] = [];
    productIds: string = '';
    status: string = this.order.status;

    constructor(public httpClient: HttpClient, private _Activatedroute: ActivatedRoute,
                public userService: UserService) {
        this._Activatedroute.paramMap.subscribe(params => {
            this.order.orderId = parseInt(params.get('id')!);
        });
        this.initializeOrder();
        this.user = this.userService.getUser();
            }

  ngOnInit(): void {
  }

  checkAuthorizationStatus(): boolean {
      this.user = this.userService.getUser();
      if( this.user && this.user.userId ) {
          return (this.user.admin || this.user.userId - this.order.customerId === 0);
      } else {
          return false;
      }
  }

  initializeOrder(): void {
      this.httpClient.get<Order>(environment.endpointURL + 'order/' + this.order.orderId)
          .subscribe((res: any) => {
              this.order = res;
              this.status=res.status;
              this.loadProductItems();
          }, (err: any) => {
              console.log(err);
          });
  }


    payOrder() {
        if(confirm("Are you sure you have paid the order?")){
            this.order.status = 'paid';
            this.httpClient.put(environment.endpointURL + 'order', {
                orderId: this.order.orderId,
                status: 'paid',

            }).subscribe(update => {
                    alert('Successfully Paid your order.\nWill be delivered soon');
                }, error => {
                    alert(error);
                });
        }
    }



    loadProductItems() {
        this.httpClient.get<ProductItem[]>(environment.endpointURL + 'order/' + this.order.orderId + '/products')
            .subscribe((res: any) => {
                this.productItems = res;
            }, (err: any) => {
                console.log(err);
            });
    }

    cancelOrder(): void{
        if(confirm("Are you sure you want to cancel the order?")) {
            this.order.status = 'cancelled';
            this.httpClient.put(environment.endpointURL + "order", {
                orderId: this.order.orderId,
                status: 'cancelled',

            }).subscribe(update => {
                    alert('Your order was cancelled successfully.');
                },
                error => {
                    alert(error);
                });
        }
    }

    changeStatus(): void{
        if(confirm("Are you sure you want to change the status?")){
            this.order.status = this.status;
            console.log(this.status);
            this.httpClient.put(environment.endpointURL + "order", {
                orderId: this.order.orderId,
                status: this.status,
            }).subscribe(update => {
                    alert('Order updated successfully.');

                },
                error => {
                    alert(error);
                });
        }
    }
}