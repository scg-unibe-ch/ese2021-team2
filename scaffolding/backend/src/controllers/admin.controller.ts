import { AdminService } from './../services/admin.service';
import express, { Router, Request, Response } from 'express';
import {checkAdmin} from '../middlewares/checkAdmin';

const adminController: Router = express.Router();
const adminService: AdminService = new AdminService();

// This is a middleware function that validates the token in the authorization header for each incoming request. Whether it is an admin.
adminController.use(checkAdmin);

adminController.get('/',
    (req: Request, res: Response) => {
        res.send(true);
    }
);

adminController.post('/subject/create',
    (req: Request, res: Response) => {
        adminService.createSubject(req.body)
            .then(subject => res.send(subject))
            .catch(err => res.status(500).send(err));
    }
);

// TODO: Add delete and modify functions for the subjects in here.

export const AdminController: Router = adminController;
