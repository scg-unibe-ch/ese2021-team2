import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-creation',
    templateUrl: './product-creation.component.html',
    styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

    uploaded : boolean = false;
    product : Product = new Product(0,"","","",undefined,0); 
    imageURL: any;
    newFile : File | undefined;
    isUpdate: boolean;

    constructor(private productService : ProductService,
                public dialogRef: MatDialogRef<ProductCreationComponent>,
                public httpClient: HttpClient,
                @Inject(MAT_DIALOG_DATA) public data: any) { 
                    this.isUpdate = data.isUpdate;
                    if(this.isUpdate){
                        this.product = data.product;
                    }
                }

    ngOnInit(): void {
    }

    handleSubmission(){
        if(this.isUpdate){
                this.productService.updateProduct(this.product)
                .then(() => {
                    this.dialogRef.close()
                });
        }else{
            if(this.newFile){
                this.productService.submitProduct(this.newFile, this.product)
                .then(() => {
                    this.dialogRef.close()
                })
            }
        }
    }

    processFile(imageInputEvent: any) {
        const f : File = imageInputEvent.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = event => {
            this.imageURL = reader.result;
        }
        this.newFile = f;
    }
}