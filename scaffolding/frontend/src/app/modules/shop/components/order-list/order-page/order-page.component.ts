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
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogModel} from "../../../../../models/confirmation-dialog.model";
import {ConfirmationDialogComponent} from "../../../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

    authorized: boolean = false;
    loggedIn: boolean;
    admin: boolean;
    user: User | null;
    order: Order = new Order(0,-1,"","","","", [],0);
    productItems: ProductItem[] = [];
    productIds: string = '';
    status: string = this.order.status;

    constructor(public httpClient: HttpClient, public snackBar : MatSnackBar, private _Activatedroute: ActivatedRoute, public userService: UserService, private dialog: MatDialog,) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.admin$.subscribe(res => this.admin = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.admin = userService.isAdmin();
        this.user = userService.getUser();
        this._Activatedroute.paramMap.subscribe(params => {
            this.order.orderId = parseInt(params.get('id')!);
        });
        this.initializeOrder();
    }

  ngOnInit(): void {
  }

  checkAuthorizationStatus(): boolean {
      this.user = this.userService.getUser();
      if( this.user && this.user.userId ) {
          return (this.admin //|| this.user.userId - this.order.customerId === 0
           );
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
        const dialogData = new ConfirmationDialogModel("Pay for your order", "Are you sure you paid for your order?");
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '400px',
            closeOnNavigation : true,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(dialogResult => {
            if(dialogResult) {
                this.order.status = 'paid';
                this.httpClient.put(environment.endpointURL + 'order', {
                    orderId: this.order.orderId,
                    status: 'paid',

                }).subscribe(update => {
                    this.snackBar.open('Successfully Paid your order.\nIt will be delivered soon.', "Dismiss", {
                        duration : 3000,
                        panelClass: ['green-snackbar'],
                    });
                }, error => {
                    alert(error);
                });
            }
        })
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
        const dialogData = new ConfirmationDialogModel("Cancel Order", "Are you sure you want to cancel the order?");
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '400px',
            closeOnNavigation : true,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(dialogResult => {
            if(dialogResult) {
                this.order.status = 'cancelled';
                this.httpClient.put(environment.endpointURL + "order", {
                    orderId: this.order.orderId,
                    status: 'cancelled',

                }).subscribe(update => {
                        this.snackBar.open("Your order was cancelled successfully.", "Dismiss", {
                            duration : 3000,
                            panelClass: ['green-snackbar'],
                        });
                    },
                    error => {
                        alert(error);
                    });
            }
        })
    }

    changeStatus(): void{
        const dialogData = new ConfirmationDialogModel("Change Status", "Are you sure you want to change the status of this order?");
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '400px',
            closeOnNavigation : true,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(dialogResult => {
            if(dialogResult) {
                this.order.status = this.status;
                console.log(this.status);
                this.httpClient.put(environment.endpointURL + "order", {
                    orderId: this.order.orderId,
                    status: this.status,
                }).subscribe(update => {
                        this.snackBar.open("Order updated successfully.", "Dismiss", {
                            duration : 3000,
                            panelClass: ['green-snackbar'],
                        });
                    },
                    error => {
                        alert(error);
                    });
            }
        })
    }
}
