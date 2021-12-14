import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/core/http/user.service';
import { ProductItem } from 'src/app/models/product-item.model';
import { ProductCreationComponent } from '../../components/product-creation/product-creation.component';
import { CartService } from '../../services/cart.service';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    searchWord:string="";
    productCount: any;
    loggedIn: boolean;
    admin: boolean;
    user: User | null;

    constructor(private cartService: CartService, private userService : UserService, private dialog : MatDialog) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.admin$.subscribe(res => this.admin = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.admin = userService.isAdmin();
        this.user = userService.getUser();
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
