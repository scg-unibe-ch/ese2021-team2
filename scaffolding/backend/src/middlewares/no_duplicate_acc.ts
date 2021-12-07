import { Request, Response } from 'express';
import { User } from '../models/user.model';

// Why does this exist? checkNoDuplicate is already implemented?
export async function check_duplicate(req: Request, res: Response, next: any) {
    try {
        const un: string = req.body.userName;
        const query = await User.findOne({where: {userName: un}});
        if (query === null) {
            next();
        } else {
            res.status(500).send({message: 'Duplicate'});
        }
    } catch (err) {
        res.status(500).send({message: 'Error'});
    }
}
