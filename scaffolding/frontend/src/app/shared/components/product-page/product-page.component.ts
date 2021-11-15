import { Component, OnInit,Input } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    this.imageURL = environment.endpointURL + "post/" + this.product.productId + "/image";
  }

}
