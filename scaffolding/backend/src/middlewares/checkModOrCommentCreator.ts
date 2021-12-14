import { BoardService } from './../services/board.service';
import { PostCommentService } from './../services/postComment.service';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function checkModOrCommentCreator(req: Request, res: Response, next: any) {
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

        const postCommentService: PostCommentService = new PostCommentService();
        const boardService: BoardService = new BoardService();
        let isCreator = false;

        postCommentService.getCreatorId(Number(req.params.commentId))
            .then(creatorId => {
                if (creatorId === req.body.tokenPayload.userId) {
                    isCreator = true;
                }
                postCommentService.getPost(Number(req.params.commentId))
                .then(post => {
                    boardService.isModerator(req.body.tokenPayload.userId, post.boardId)
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
            })
            .catch(err => res.status(500).send(err));
    } catch (err) {
        res.status(403).send({ message: 'Forbidden' });
    }
}
