import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    @Input() product = new Product(0, "", "", "", undefined, 0)

    imageURL: string = "";
    loggedIn: boolean;
    admin: boolean;
    user: User | null;

    constructor(public userService : UserService, public productService: ProductService) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.admin$.subscribe(res => this.admin = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.admin = userService.isAdmin();
        this.user = userService.getUser();
    }

    ngOnInit(): void {
        this.imageURL = environment.endpointURL + "product/" + this.product.productId + "/image";
    }

    handleDelete(){
        this.productService.deleteProduct(this.product.productId);
    }

}
