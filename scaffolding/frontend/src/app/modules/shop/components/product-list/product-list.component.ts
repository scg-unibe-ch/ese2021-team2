import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  filterarg = 'fashion';

  constructor(public httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
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
