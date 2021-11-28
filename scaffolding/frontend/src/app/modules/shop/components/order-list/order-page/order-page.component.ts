import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../../models/order.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../../core/http/user.service";
import {User} from "../../../../../models/user.model";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

    authorized: boolean = false;
    user: User | null;
    order: Order = new Order(0,-1,"","","","", [],0);

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
          console.log('if case');
          return (this.user.admin || this.user.userId - this.order.customerId === 0);
      } else {
          console.log('else case');
          return false;
      }
  }

  initializeOrder(): void {
      this.httpClient.get(environment.endpointURL + 'order/' + this.order.orderId)
          .subscribe((res: any) => {
              this.order = res.order;
          }, (err: any) => {
              console.log(err);
          });
  }


    payOrder() {
        this.order.status = 'paid';
        this.httpClient.put(environment.endpointURL + 'order', {
            orderId: this.order.orderId,
            status: 'paid',

        })
            .subscribe(update => {
                alert('Successfully Paid your order.\nWill be delivered soon');
            }, error => {
                alert(error);
            });
    }
}
