import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/http/user.service';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  @Input() product = new Product(0, "", "", "", undefined, 0)

  imageURL: string = "";
  productId: number = 0;

  constructor(public httpClient: HttpClient,
              private _Activatedroute:ActivatedRoute,
              public cartService: CartService,
              public userService : UserService,
              public snackBar : MatSnackBar) { 
    this._Activatedroute.paramMap.subscribe(params => { 
      this.productId= parseInt(params.get('productId')!); 
      this.httpClient.get( environment.endpointURL + "product/" + this.productId)
      .subscribe((product: any) => {
        this.product = product;
        this.imageURL = environment.endpointURL + "product/" + this.product.productId + "/image";
      })
  });
  }

  ngOnInit(): void {
    
  }

  handleAdd(){
    this.cartService.addProduct(this.product, 1);
    this.snackBar.open(this.product.title + " successfully added", "Dismiss", {
      duration : 5000,
    });
  }
}
