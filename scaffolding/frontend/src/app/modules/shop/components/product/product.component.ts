import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    @Input() product = new Product(0, "", "", "", undefined, 0)

    imageURL: string = "";
    isAdmin: boolean | undefined;

    constructor(public userService : UserService, public productService: ProductService) {
        this.userService.user$.subscribe((res) => this.isAdmin = res?.admin);
        
        this.isAdmin = this.userService.getUser()?.admin;
    }

    ngOnInit(): void {
        this.imageURL = environment.endpointURL + "product/" + this.product.productId + "/image";
    }

    handleDelete(){
        this.productService.deleteProduct(this.product.productId);
    }

}
