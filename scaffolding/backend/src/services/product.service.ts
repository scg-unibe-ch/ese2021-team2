import { Product, ProductAttributes } from '../models/product.model';
import {Request} from 'express';
import { MulterRequest } from '../models/multerRequest.model';
import { ProductImage, ProductImageAttributes } from '../models/productImage.model';
import { upload } from '../middlewares/fileFilter';
import { DeleteResponse } from '../models/accountDelete.model';
import { unlinkSync } from 'fs';

export class ProductService {

    public createProduct(product: ProductAttributes): Promise<ProductAttributes> {
        return Product.create(product)
        .then(inserted  => Promise.resolve(inserted))
        .catch(err => Promise.reject(err));
    }

    public find(req: Request): Promise<Product> {
        return new Promise((resolve, reject) => {
            Product.findByPk(req.params.id).then((product) =>  {
                if (!product) {
                    reject({message: 'No such product'});
                } else {
                    resolve(product);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public addImage(req: MulterRequest): Promise<ProductImageAttributes> {
        return Product.findByPk(req.params.id)
        .then(found => {
            if (!found) {
                return Promise.reject({message: 'Product does not exist'});
            } else {
                return new Promise<ProductImageAttributes>((resolve, reject) => {
                    upload.single('image')(req, null, (error: any) => {
                        ProductImage.create({ fileName: req.file.filename, productId: found.productId })
                            .then(created => resolve(created))
                            .catch(err => reject({message: 'Could not upload image'}));
                    });
                });
            }
        })
        .catch(err => Promise.reject({message: 'Could not upload image'}));
    }

    public async delete(req: any): Promise<DeleteResponse> {
        try {
            const id = req.params.id;
            const imageName = await ProductImage.findOne({
                attributes: ['fileName'],
                where: {productId : id}
            });
            Product.destroy({
                where: {productId : id}
            }).then(async () => {
                await unlinkSync('./uploads/' + imageName.fileName);
                return Promise.resolve({message: 'Deletion Successful'});
            }).catch((err) => {
                return Promise.reject(err);
            });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async update(req: any) {
        try {
            const id = req.params.id;
            await Product.update({
                title : req.body.title,
                description : req.body.description,
                productImage : req.body.productImage,
                category: req.body.category,
                price : req.body.price,
            }, {
                where : {
                    productId : id,
                }
            }).catch((err) => {
                return Promise.reject();
            });
            return Promise.resolve();

        } catch (err) {
            return Promise.reject(err);
        }
    }
}
