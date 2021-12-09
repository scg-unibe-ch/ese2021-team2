import { OrderService } from '../services/order.service';
import express, { Router, Request, Response } from 'express';

const orderController: Router = express.Router();
const orderService = new OrderService();
const stripe = require('stripe')('sk_test_51JzfroDwNYe9Y3WcBdkDzuhQi788x9tQO3anNhsDGEaGT6lUvhoadyMLRidDQVMcUydGOGx8thcywc6DMwADoQKg00jbzy0p6z');

orderController.post('/createOrder', (req: Request, res: Response) => {
    console.log(req.body.productItems);
    console.log(req.body);
    orderService.createOrder(req.body.order, req.body.productItems)
            .then(created => res.status(200).send(created))
            .catch(err => res.status(500).send(err));
});

orderController.post('/payment/stripe',
    async (req, res, next) => {
    try {
        const stripeToken = await stripe.charges.create({
            amount: req.body.amount * 100,
            currency: 'CHF',
            description: 'one time fee',
            source: req.body.token.id,
        });
        res.status(200).json({success: true, status: 'Successfully paid ' + req.body.amount});
    } catch ( err ) {
        res.status(500).send({message: err.raw.message});
    }
    });

orderController.get('/:id/orders', (req: Request, res: Response) => {
    orderService.getOrdersOfUser(parseInt(req.params.id, 10))
        .then(orders => {
            res.status(200).json({orders: orders});
        })
        .catch(err => res.status(500).send(err));
});

orderController.get('/all', (req: Request, res: Response) => {
    orderService.getAllOrders()
        .then(orders => {
            res.status(200).json({orders: orders});
        })
        .catch(err => res.status(500).send(err));
});

orderController.get('/:id', (req: Request, res: Response) => {
    orderService.getOrder(parseInt(req.params.id, 10))
        .then(order => {
            res.status(200).send(order);
        })
        .catch(err => res.status(500).send(err));
});

orderController.put('', (req: Request, res: Response) => {
    console.log(req.body);
    orderService.updateOrder(req.body)
        .then(order => {
            console.log('working');
            res.status(200).json({order: order});
        })
        .catch(err => res.status(500).send({message: err}));
});

orderController.get('/:id/products', (req: Request, res: Response) => {
    orderService.getOrderProductItems(parseInt(req.params.id, 10))
        .then(orderProductItems => {
            res.status(200).send(orderProductItems);
        })
        .catch(err => res.status(500).send(err));
});

export const OrderController: Router = orderController;
