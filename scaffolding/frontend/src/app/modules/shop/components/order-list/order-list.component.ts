import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../../../models/order.model";
import {environment} from "../../../../../environments/environment";
import {UserService} from "../../../../core/http/user.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    userId: number | undefined;
    orders: Order[] = [];

  constructor(public httpClient: HttpClient, public userService: UserService) {
      this.userId = this.userService.getUser()?.userId;
      this.initializeOrders();
  }



  ngOnInit(): void {
  }

    initializeOrders(): void {
        if (this.userId) {
            this.httpClient.get(environment.endpointURL + 'order/' + this.userId + '/orders')
                .subscribe((res: any) => {
                    console.log('Received orders');
                    console.log(res);
                    this.orders = res.orders;
                }, (error => console.log(error)));
        }
    }
}
