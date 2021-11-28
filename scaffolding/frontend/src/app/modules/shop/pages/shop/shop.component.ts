import { Component, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/models/product-item.model';
import { CartService } from '../../services/cart.service';
import {UserService} from "../../../../core/http/user.service";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    searchWord:string="";
    productCount;

    constructor(private cartService: CartService, public userService: UserService) {
        
        cartService.products$.subscribe(res => this.productCount = this.getProductCount(res)); 

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
}
