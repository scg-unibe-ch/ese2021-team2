import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../../../models/order.model";
import {environment} from "../../../../../environments/environment";
import {UserService} from "../../../../core/http/user.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    loggedIn: boolean;
    admin: boolean;
    user: User | null;
    orders: Order[] = [];

    constructor(public httpClient: HttpClient, public userService: UserService) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.admin$.subscribe(res => this.admin = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.admin = userService.isAdmin();
        this.user = userService.getUser();
        this.initializeOrders();
    }



    ngOnInit(): void {
    }

    initializeOrders(): void {
        if (this.user) {
            if (this.admin) {
                this.httpClient.get(environment.endpointURL + 'order/all')
                    .subscribe((res: any) => {
                        this.orders = res.orders;
                    }, (error => console.log(error)));
            } else {
                this.httpClient.get(environment.endpointURL + 'order/' + this.user.userId + '/orders')
                    .subscribe((res: any) => {
                        this.orders = res.orders;
                    }, (error => console.log(error)));
            }
        }
    }
}
