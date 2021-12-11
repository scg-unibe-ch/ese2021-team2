import { AdminService } from './../services/admin.service';
import express, { Router, Request, Response } from 'express';
import {checkAdmin} from '../middlewares/checkAdmin';

const adminController: Router = express.Router();
const adminService: AdminService = new AdminService();

// This is a middleware function that validates the token in the authorization header for each incoming request. Whether it is an admin.
adminController.use(checkAdmin);

adminController.get('/',
    (req: Request, res: Response) => {
        console.log('TEST');

        res.send(true);
    }
);

adminController.post('/',
    (req: Request, res: Response) => {
        adminService.makeAdmin(req.body.userId)
            .then(() => res.status(200).send())
            .catch(err => res.status(500).send(err));
    }
);

export const AdminController: Router = adminController;
