import { Product, ProductAttributes } from '../models/product.model';
import {Request} from 'express';

export class ProductService {

    public createProduct(product: ProductAttributes): Promise<ProductAttributes> {
        return Product.create(product)
        .then(inserted  => Promise.resolve(inserted))
        .catch(err => Promise.reject(err));
    }

    public find(req: Request): Promise<Product> {
        return new Promise((resolve, reject) => {
            Product.findByPk(req.params.id).then((product) =>  {
                if (product === null) {
                    reject('No such product');
                } else {
                    resolve(product);
                }
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
}
