import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  @Input() product = new Product(0, "", "", "", undefined, 0)

  imageURL: string = "";
  productId: number = 0;

  constructor(public httpClient: HttpClient, private _Activatedroute:ActivatedRoute) { 
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

}
