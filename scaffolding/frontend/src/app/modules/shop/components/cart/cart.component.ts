import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogModel } from 'src/app/models/confirmation-dialog.model';
import { ProductItem } from 'src/app/models/product-item.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/environments/environment';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    products: ProductItem[]
    imageURL = environment.endpointURL + "product/";

    constructor(public cartService: CartService, private dialog: MatDialog) {

        //listen to changes
        cartService.products$.subscribe(res => this.products = res);

        this.products = this.cartService.getProducts();
    }

    ngOnInit(): void {
    }

    handleDecrease(product : ProductItem) {
        this.cartService.decreaseAmount(product);
    }

    handleIncrease(product: ProductItem) {
        this.cartService.increaseAmount(product);
    }

    concatURL(id : number) {
        return this.imageURL + "/" + id + "/image";
    }

    isDisabled(item : ProductItem) {
        return item.quantity <= 1;
    }

    handleRemove(product: ProductItem) {
        this.cartService.removeItem(product)
    }

    handleRemoveAll(){
        const dialogData = new ConfirmationDialogModel("Empty Cart", "Are you sure you want to remove all items from your cart?");
        const dialogRef =  this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '400px',
            closeOnNavigation : true,
            data: dialogData
        })
        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.cartService.clearCart();
            }
        });
    }

    getPrice(item : ProductItem) : number {
        return item.quantity * item.product.price;
    }

    getTotal() : number {
        var sum = 0;
        for ( var item in this.products) {
            sum += this.getPrice(this.products[item])
        }
        return sum;
    }
}