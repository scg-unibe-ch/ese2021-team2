
import { OrderService } from '../services/order.service';
import express, { Router, Request, Response } from 'express';

const orderController: Router = express.Router();
const orderService = new OrderService();

orderController.post('/createOrder', (req: Request, res: Response) => {
    orderService.createOrder(req.body)
            .then(created => res.status(200).send(created))
            .catch(err => res.status(500).send(err));
});


export const OrderController: Router = orderController;
