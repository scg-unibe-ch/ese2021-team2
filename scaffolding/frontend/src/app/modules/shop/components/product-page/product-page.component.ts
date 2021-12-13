import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/http/user.service';
import { Product } from 'src/app/models/product.model';
import { UserComponent } from 'src/app/user/user.component';
import { environment } from 'src/environments/environment';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { User } from 'src/app/models/user.model';
import { ProductCreationComponent } from '../product-creation/product-creation.component';
import { DataService } from 'src/app/modules/service/data.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

    @Input() product = new Product(0, "", "", "", undefined, 0)

    imageURL: string = "";
    productId: number = 0;
    loggedIn: boolean;
    admin: boolean;
    user: User | null;

    constructor(public httpClient: HttpClient, private _Activatedroute:ActivatedRoute, public cartService: CartService,
        public userService : UserService, public snackBar : MatSnackBar, private dialog: MatDialog,
        private dataService: DataService
    ) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.admin$.subscribe(res => this.admin = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.admin = userService.isAdmin();
        this.user = userService.getUser();

        this._Activatedroute.paramMap.subscribe(params => {
            this.productId= parseInt(params.get('productId')!);
            this.httpClient.get( environment.endpointURL + "product/" + this.productId)
            .subscribe((product: any) => {
                this.product = product;
                this.imageURL = environment.endpointURL + "product/" + this.product.productId + "/image";
            })
        });
    }

    ngOnInit(): void {

    }

    handleAdd(){
        if(this.userService.getLoggedIn()) {
            this.cartService.addProduct(this.product, 1);
            this.snackBar.open(this.product.title + " successfully added", "Dismiss", {
            duration : 3000,
            panelClass: ['green-snackbar'],
            });
        } else {
            const dialogConfig = new MatDialogConfig();
            //dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = {
                loginDialog : true
            }
            this.dialog.open(UserComponent,dialogConfig);
        }
    }

    handleUpdate(){
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            isUpdate : true,
            product : this.product
        }
        this.dialog.open(ProductCreationComponent, dialogConfig);
    }

    setFilter(){
        this.dataService.changeMessage(this.product.category);
    }
}
