import { Component, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/models/product-item.model';
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

    constructor(public cartService: CartService) {

        //listen to changes
        cartService.products$.subscribe(res => this.products = res);

        this.products = this.cartService.getProducts();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.cartService.clearCart()
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
}