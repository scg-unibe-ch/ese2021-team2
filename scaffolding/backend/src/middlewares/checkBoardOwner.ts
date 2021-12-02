import { BoardService } from '../services/board.service';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function checkBoardOwner(req: Request, res: Response, next: any) {
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

        const boardService: BoardService = new BoardService();

        boardService.getOwnerId(req.body.boardId)
            .then(ownerId => {
                if (ownerId === req.body.tokenPayload.userId) {
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
