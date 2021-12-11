import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/http/user.service';
import { ProductItem } from 'src/app/models/product-item.model';
import { Product } from 'src/app/models/product.model';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    
    products : ProductItem[] = []
    private productSource = new Subject<ProductItem[]>();
    private loggedIn: boolean;

    //Observable streams
    products$ = this.productSource.asObservable();

    constructor(private userService: UserService) {
        userService.loggedIn$.subscribe( res => {
            this.loggedIn = res;
            this.checkLogout()
        });
        var items = sessionStorage.getItem('cart')
        if (items) {
            this.products = JSON.parse(items);
        }
        this.checkLogout();
    }

    addProduct(product : Product, quantity: number) {
        var duplicate = false;
        this.products.forEach(itm => {
        if(itm.product.productId === product.productId) {
            duplicate = true;
            itm.quantity++;
        }
        });
        if(!duplicate){
            var item = new ProductItem();
            item.product = product;
            item.quantity = quantity;
            this.products.push(item);
        }
        sessionStorage.setItem('cart', JSON.stringify(this.products));
    }
    

    getProducts(): ProductItem[] {
        return this.products;
    }

    clearCart(){
        this.products = [];
        sessionStorage.removeItem('cart');
        this.productSource.next(this.products);
    }

    decreaseAmount(product : ProductItem) {
        if(product.quantity === 0)
            return;
        this.products.forEach(itm => {
        if(product.product.productId === itm.product.productId)
            itm.quantity--
        })
        sessionStorage.setItem('cart', JSON.stringify(this.products));
    }

    increaseAmount(product : ProductItem) {
        this.products.forEach(itm => {
        if(product.product.productId === itm.product.productId)
            itm.quantity++
        })
        sessionStorage.setItem('cart', JSON.stringify(this.products));
    }

    removeItem(product : ProductItem) {
        const index = this.products.indexOf(product);
        if(index >= 0){
            this.products.splice(index, 1);
            sessionStorage.setItem('cart', JSON.stringify(this.products));
        }
    }

    private checkLogout() {
        if (!this.userService.getLoggedIn()){
            this.clearCart();
        }
    }
}