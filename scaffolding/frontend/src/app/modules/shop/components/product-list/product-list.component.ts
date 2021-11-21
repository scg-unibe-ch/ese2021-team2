import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { DataService } from "../../../service/data.service";
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    products: Product[] = []
    filterarg = 'fashion';
    subscription: Subscription;

    constructor(public httpClient: HttpClient,private data: DataService) {}

    ngOnInit(): void {
        this.getProducts();
        this.subscription = this.data.currentMessage.subscribe(message => this.filterarg = message)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getProducts(): void{
        this.httpClient.get(environment.endpointURL + "product/category/all")
        .subscribe((res: any) => {
            this.products = res
        } ,
        err => {
            console.log(err);
        }
        );
    }

}
