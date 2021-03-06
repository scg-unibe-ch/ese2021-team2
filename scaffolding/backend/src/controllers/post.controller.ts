import express, { Router, Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { MulterRequest } from '../models/multerRequest.model';
import { PostImage } from '../models/postImage.model';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';
import { verifyToken } from '../middlewares/checkAuth';
import { checkModOrPostCreator } from '../middlewares/checkModOrPostCreator';
import { DeletePostRequest } from '../models/postRequest.model';
import { Like } from '../models/like.model';

// The mergeParams: true makes it so that the :boardId from the parent route in server.ts get passed onto this.
const postController: Router = express.Router();
const postService = new PostService();
const userService = new UserService();

postController.post('/createPost', verifyToken,
    (req: Request, res: Response) => {
        req.body.post = req.body;
        postService.createPost(req.body)
            .then(created => res.send(created))
            .catch(err => res.status(500).json({message: err}));
    }
);

postController.delete('/:postId/delete', checkModOrPostCreator,
    (req: Request, res: Response) => {
        req.body.postId = req.params.postId;
        postService.deletePost(req.body)
            .then(deleted => res.send({message: deleted}))
            .catch(err => res.status(500).send(err));
    }
);

postController.post('/:postId/image',
    (req: MulterRequest, res: Response) => {
        postService.addImage(req)
        .then(created => res.send(created))
        .catch(err => res.status(500).send(err));
    }
);

postController.get('/:postId',
    (req: Request, res: Response) => {
        postService.getPost(parseInt(req.params.postId, 10))
            .then(post => res.send(post))
            .catch(err => res.status(500).send(err));
    });

postController.get('/:postId/image',
    (req: Request, res: Response) => {
        PostImage.findOne({
            where: {
                postId: req.params.postId}
        }).then(image => {
            if (image) {
                res.sendFile('./uploads/' + image.fileName, { root: process.cwd()});
            } else {
                res.status(500).send('No image found');
            }
        }).catch((err) => res.send(err));
    }
);

// needs to be changed to get request
postController.get('/getPostsOfBoard/:boardId',
    (req: Request, res: Response) => {
        postService.getPostsOfBoard(parseInt(req.params.boardId, 10))
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err));
    }
);

// needs to be changed to get request
postController.get('/getPostsByUser/:userId',
    (req: Request, res: Response) => {
        postService.getPostsbyUser(parseInt(req.params.userId, 10))
            .then(posts => {
                res.send(posts);
            })
            .catch(err => res.status(500).send(err));
    }
);

postController.put('/:postId', verifyToken,
    (req: Request, res: Response) => {
        req.body.postId = req.params.postId;
        req.body.postUpdate = req.body;
        postService.updatePost(req.body)
            .then(updated => res.json(updated))
            .catch(err => res.status(500).send(err));
    }
);

postController.post('/:postId/bookmark', verifyToken,
    (req: Request, res: Response) => {
        req.body.bookmark = {
            postId: req.params.postId,
            userId: req.body.tokenPayload.userId
        };
        postService.bookmarkPost(req.body)
            .then(created => res.send(created))
            .catch(err => res.status(500).send(err));
    }
);

postController.get('/:postId/bookmark/', verifyToken,
    (req: Request, res: Response) => {
        postService.getBookmarkStatus(req.body.tokenPayload.userId, parseInt(req.params.postId, 10))
            .then((isBookmarked) => res.send(isBookmarked))
            .catch((err) => res.status(500).send(err));
    }
);

postController.get('/bookmarks/all', verifyToken,
    (req: Request, res: Response) => {
        postService.getBookmarkList(req.body.tokenPayload.userId)
            .then(bookmarkedPosts => res.send(bookmarkedPosts))
            .catch(err => res.status(500).send(err));
    });

postController.post('/getLikesByPostId',
    (req: Request, res: Response) => {
        Like.findAll({
            where: {
                postId: req.body.postId,
            }
        }).then(likes => {
            res.send(likes);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
);

postController.delete('/:postId/bookmark/delete', verifyToken,
    (req: Request, res: Response) => {
        postService.deleteBookmark(parseInt(req.params.postId, 10), req.body.tokenPayload.userId)
            .then(deleted => res.send({msg: deleted}))
            .catch(err => res.status(500).send(err));
    }
);

postController.post('/unlike',
    (req: Request, res: Response) => {
        Like.destroy({
            where: {
                userId: req.body.userId,
                postId: req.body.postId
            }
        }).catch(
           err => res.send(err)
        );
    }
);


export const PostController: Router = postController;
