import { Request, Response } from 'express';
import { User } from '../models/user.model';

export async function checkNoDuplicates(req: Request, res: Response, next: any) {
    try {
        const un: string = req.body.userName;
        const query = await User.findOne({where: {userName: un}});

        if (query !== null) {
            res.status(422).send({message: 'Username already in use'});
        } else {
            next();
        }
    } catch (err) {


        res.status(500).send({message: 'Error'});
    }
}
