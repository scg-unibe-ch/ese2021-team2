import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  //using the product title as a key because using an object like Product leads to duplicates
  products : Map<string, [Product, number]> = new Map<string, [Product, number]>();

  private productSource = new Subject<Map<string, [Product, number]>>(); 

  //Observable streams
  products$ = this.productSource.asObservable();

  constructor() { }

  addProduct(product : Product, amount: number) {
    if(this.products.has(product.title)) {
      const tuple = this.products.get(product.title)
      var prev = 0
      if(tuple)
        prev = tuple[1]
      this.products.set(product.title, [product,amount + prev ]);
    }
    else {
      this.products.set(product.title, [product, amount]);
    }
  }

  getProducts(): Map<string, [Product, number]> {
    return this.products;
  }

  clearCart(){
    this.products.clear();
  }

  decreaseAmount(product : Product) {

  }

  increaseAmount(product : Product) {

  }
}
