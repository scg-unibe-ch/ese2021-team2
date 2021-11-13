import express, { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/', (req: Request, res: Response) => {
    productService.createProduct(req.body)
    .then(created => res.status(200).send(created))
    .catch(err => res.status(500).send(err));
});


productController.get('/:id', (req: Request, res: Response) => {
    productService.find(req).then(found => res.status(200).send(found)).catch(err => res.status(500).send(err));
});

productController.post('image/:id', (req: Request, res: Response) => {
    // TODO: implement
});

productController.get('image/:id', (req: Request, res: Response) => {
    // TODO: implement
});

export const ProductController: Router = productController;
