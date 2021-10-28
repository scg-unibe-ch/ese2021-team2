import express, { Router, Request, Response } from 'express';
import { request } from 'http';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

const postController: Router = express.Router();
const postService = new PostService;

postController.post('/createPost',
    (req: Request, res: Response) => {
        postService.createPost(req.body)
            .then(created => res.send(created))
            .catch(err => res.status(500).send(err));
    }
);

postController.delete('/delete',
(req: Request, res: Response) => {
    Post.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

postController.post('/getPostsOfBoard',
    (req: Request, res: Response) => {
        postService.getPostsOfBoard(req.body.boardId)
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err));
    }
);

postController.put('/:id', (req: Request, res: Response) => {
    Post.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

export const PostController: Router = postController;
