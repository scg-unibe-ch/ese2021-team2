import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private httpClient : HttpClient) { }

    submitProduct(image : File, product : Product) : Promise<Product> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.endpointURL + "product", product)
            .subscribe((created: any) => {
                this.addPhoto(image, created.productId);
                resolve(created);
            },
            (err :any) => {
                reject(err);
            });
        })
    }

    addPhoto(image : File, id : number){
        const fd = new FormData();
        fd.append('image', image);
        this.httpClient.post(environment.endpointURL + "product/" + id + "/image", fd)
        .subscribe(() => {
        })
    }

    updateProduct(product: Product): Promise<void>{
        return new Promise((resolve, reject) => {
            this.httpClient.put(environment.endpointURL + 'product/' + product.productId, product)
            .subscribe(() => {
                resolve();
            }, err => {
                reject();
            })
        })
    }

    deleteProduct(productId: number){
        this.httpClient.delete(environment.endpointURL + 'product/' + productId).subscribe();
    }
}