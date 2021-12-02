import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/core/http/user.service';
import { ProductItem } from 'src/app/models/product-item.model';
import { ProductCreationComponent } from '../../components/product-creation/product-creation.component';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    searchWord:string="";
    productCount: any;
    isAdmin: boolean | undefined;
    loggedIn: boolean | undefined;

    constructor(private cartService: CartService, private userService : UserService, private dialog : MatDialog) {
        
        userService.user$.subscribe(res => this.isAdmin = res?.admin);
        cartService.products$.subscribe(res => this.productCount = this.getProductCount(res)); 

        this.isAdmin = this.userService.getUser()?.admin;
        this.loggedIn = this.userService.getLoggedIn();
        this.productCount = this.getProductCount(this.cartService.getProducts()); 
    }

    ngOnInit(): void {
    }

    private getProductCount(products : ProductItem[]): number {
        var count = 0;
        products.forEach((item) => {
            count += item.quantity;
        });
        return count;
    }

    handleCreateProduct() {
        const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.data = {
                isUpdate: false,
            }
            this.dialog.open(ProductCreationComponent,dialogConfig);
    }
}
