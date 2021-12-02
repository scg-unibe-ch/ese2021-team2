import { BoardService } from './../services/board.service';
import { PostService } from './../services/post.service';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function checkModOrPostCreator(req: Request, res: Response, next: any) {
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

        const postService: PostService = new PostService();
        const boardService: BoardService = new BoardService();
        let isCreator = false;

        postService.getCreatorId(Number(req.params.postId))
            .then(creatorId => {
                if (creatorId === req.body.tokenPayload.userId) {
                    isCreator = true;
                }
                boardService.isModerator(req.body.tokenPayload.userId, Number(req.params.boardId))
                .then(isMod => {
                    if (isMod || isCreator) {
                        next();
                    } else {
                        res.status(403).send({ message: 'Forbidden' });
                    }
                })
                .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
    } catch (err) {
        res.status(403).send({ message: 'Forbidden' });
    }
}
