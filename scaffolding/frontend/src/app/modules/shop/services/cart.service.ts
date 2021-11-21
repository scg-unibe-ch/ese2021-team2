import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductItem } from 'src/app/models/product-item.model';
import { Product } from 'src/app/models/product.model';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    
    products : ProductItem[] = []
    private productSource = new Subject<ProductItem[]>();

    //Observable streams
    products$ = this.productSource.asObservable();

    constructor() {
        var items = sessionStorage.getItem('cart')
        if (items) {
            this.products = JSON.parse(items);
        }
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
        debugger;
        if(index >= 0){
            this.products.splice(index, 1);
            sessionStorage.setItem('cart', JSON.stringify(this.products));
        }
    }
}