import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { DataService } from "../../../service/data.service";
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    products: Product[] = []
    filterarg = 'fashion';
    subscription: Subscription;
    @Input() searchTerm:string="";

    constructor(public httpClient: HttpClient,private data: DataService,
                private productService : ProductService) {
                    this.productService.product$.subscribe(res => this.products = res);
                }

    ngOnInit(): void {
        this.subscription = this.data.currentMessage.subscribe(message => this.filterarg = message)
        this.products = this.productService.getProducts();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
