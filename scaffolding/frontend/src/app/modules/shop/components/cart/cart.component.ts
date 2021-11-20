import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Map<string, [Product, number]> = new Map<string, [Product, number]>();

  constructor(public cartService: CartService) {

    //listen to changes
    cartService.products$.subscribe(res => this.products = res);

    this.products = this.cartService.getProducts();
  }

  ngOnInit(): void {
  }

  handleRemove(product : Product) {
    this.cartService.decreaseAmount(product);
  }

  handleAdd(product: Product) {
    this.cartService.increaseAmount(product);
  }
}
