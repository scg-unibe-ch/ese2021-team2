import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    @Input() product = new Product(0, "", "", "", undefined, 0)

    imageURL: string = "";

    constructor() {}

    ngOnInit(): void {
        this.imageURL = environment.endpointURL + "product/" + this.product.productId + "/image";
    }
}
