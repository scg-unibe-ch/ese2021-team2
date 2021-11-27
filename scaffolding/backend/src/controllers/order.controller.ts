
import { OrderService } from '../services/order.service';
import express, { Router, Request, Response } from 'express';

const orderController: Router = express.Router();
const orderService = new OrderService();
const stripe = require('stripe')('sk_test_51JzfroDwNYe9Y3WcBdkDzuhQi788x9tQO3anNhsDGEaGT6lUvhoadyMLRidDQVMcUydGOGx8thcywc6DMwADoQKg00jbzy0p6z');

orderController.post('/createOrder', (req: Request, res: Response) => {
    orderService.createOrder(req.body)
            .then(created => res.status(200).send(created))
            .catch(err => res.status(500).send(err));
});

orderController.post('/payment/stripe',
    async (req, res, next) => {
    try {
        await stripe.charges.create({
            amount: req.body.amount * 100,
            currency: 'CHF',
            description: 'one time fee',
            source: req.body.token.id
        });
        res.status(200).json({success: true, status: 'Successfully paid ' + req.body.amount});
    } catch ( err ) {
        res.status(500).json({success: false, message: err.raw.message});
    }
    });

orderController.get(':id/orders', (req: Request, res: Response) => {
    orderService.getOrders(parseInt(req.params.id, 10))
        .then(orders => {
            res.status(200).json({orders: orders});
        })
        .catch(err => res.status(500).send(err));
});

export const OrderController: Router = orderController;
