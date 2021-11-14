import express, { Router, Request, Response } from 'express';
import { MulterRequest } from '../models/multerRequest.model';
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

export const ProductController: Router = productController;
