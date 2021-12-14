import { PostService } from './../services/post.service';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import {ModeratorService} from '../services/moderator.service';

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
        const moderatorService: ModeratorService = new ModeratorService();
        let isCreator = false;
        console.log(req.params);
        postService.getPost(Number(req.params.postId)).then(post => {
            postService.getCreatorId(Number(req.params.postId))
                .then(creatorId => {
                    if (creatorId === req.body.tokenPayload.userId) {
                        isCreator = true;
                    }
                    moderatorService.isModerator(req.body.tokenPayload.userId, Number(post.boardId))
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
