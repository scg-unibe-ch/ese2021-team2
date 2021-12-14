import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

// this way you can just define a function and export it instead of a whole class
export function checkAdmin(req: Request, res: Response, next: any) {
    try {
        // get secret key from environment (defined in nodemon.json)
        const secret = process.env.JWT_SECRET;
        // since the authorization header consists of "Bearer <token>" where <token> is a JWT token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        if (decoded == null) {
            res.status(403).send({ message: 'Forbidden' });
        }
        req.body.tokenPayload = decoded;
        const adminService: AdminService = new AdminService();
        adminService.isAdmin(req.body.tokenPayload.userId)
            .then(isAdmin => {
                if (isAdmin) {
                    next();
                } else {
                    res.status(403).send({ message: 'Forbidden' });
                }
            })
            .catch(err => res.status(500).send(err));
    } catch (err) {
        res.status(403).send({ message: 'Forbidden' });
    }
}
