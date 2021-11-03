import express, { Router, Request, Response } from 'express';
import { request } from 'http';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { MulterRequest } from '../models/multerRequest.model';
import { PostImage } from '../models/postImage.model';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';
import {verifyToken} from '../middlewares/checkAuth';

const postController: Router = express.Router();
const postService = new PostService();
const userService = new UserService();

postController.post('/createPost',
    (req: Request, res: Response) => {
        postService.createPost(req.body)
            .then(created => res.send(created))
            .catch(err => res.status(500).send(err));
    }
);

postController.delete('/:id/delete', verifyToken,
(req: Request, res: Response) => {
    userService.getUser(req.body.tokenPayload.userId)
        .then(user => {
            Post.findByPk(req.params.id)
                .then(found => {
                    if (found != null) {
                        if ( found.creatorId === user.userId || user.admin === true ) {
                            found.destroy().then(() => res.status(200).send());
                        }
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(err => res.status(500).send(err));

        })
        .catch(err => res.status(500).send(err));
});

postController.post('/:id/image', (req: MulterRequest, res: Response) => {
    postService.addImage(req).then(created => res.send(created)).catch(err => res.status(500).send(err));
    }
);

postController.get('/:id/image', (req: Request, res: Response) => {
    PostImage.findOne({
        where: {
            postId: req.params.id}
    }).then(image => {
        if (image) {
            res.sendFile('./uploads/' + image.fileName, { root: process.cwd()});
        } else {
            res.status(500).send('No image found');
        }
    }).catch((err) => res.send(err));
});


// needs to be changed to get request
postController.post('/getPostsOfBoard',
    (req: Request, res: Response) => {
        postService.getPostsOfBoard(req.body.boardId)
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err));
    }
);



// needs to be changed to get request
postController.post('/getPostsByUser',
    (req: Request, res: Response) => {
        postService.getPostsbyUser(req.body.userId).then(posts => res.send(posts)).catch(err => res.status(500).send(err));
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
