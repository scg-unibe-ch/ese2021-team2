import express, { Router, Request, Response } from 'express';
import { request } from 'http';
import { MulterRequest } from '../models/multerRequest.model';
import { Product } from '../models/product.model';
import { ProductImage } from '../models/productImage.model';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

// CREATE product
productController.post('/', (req: Request, res: Response) => {
    productService.createProduct(req.body)
    .then(created => res.status(200).send(created))
    .catch(err => res.status(500).send(err));
});

// READ product
productController.get('/:id', (req: Request, res: Response) => {
    productService.find(req).then(found => res.status(200).send(found)).catch(err => res.status(500).send(err));
});

// CREATE productImage
productController.post('/:id/image', (req: MulterRequest, res: Response) => {
    productService.addImage(req).then((info) => res.status(200).send(info)).catch(err => res.status(500).send(err));
});

// READ productImage
productController.get('/:id/image', (req: Request, res: Response) => {
    ProductImage.findOne({
        where: {
            productId: req.params.id}
    }).then(image => {
        if (image) {
            res.sendFile('./uploads/' + image.fileName, { root: process.cwd()});
        } else {
            res.status(500).send('No image found');
        }
    }).catch((err) => res.send(err));
});

// READ all products
productController.get('/category/all', (req: Request, res: Response) => {
    Product.findAll().then(products => {
        if (products) {
            res.status(200).send(products);
        } else {
            res.status(500).send('No products found');
        }
    }).catch((err) => res.send(err));
});

productController.delete('/:id', (req: Request, res: Response) => {
    productService.delete(req).then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err));
});

productController.put('/:id', (req: Request, res: Response) => {
    productService.update(req)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err));
});

export const ProductController: Router = productController;
