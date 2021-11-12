import express, { Router, Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { MulterRequest } from '../models/multerRequest.model';
import { PostImage } from '../models/postImage.model';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';
import {verifyToken} from '../middlewares/checkAuth';
import {DeletePostRequest} from '../models/postRequest.model';
import { Subject } from '../models/subject.model';


const postController: Router = express.Router();
const postService = new PostService();
const userService = new UserService();

postController.post('/createPost', verifyToken,
    (req: Request, res: Response) => {
        req.body.post = req.body;
        postService.createPost(req.body)
            .then(created => res.send(created))
            .catch(err => res.status(500).send(err));
    }
);

postController.delete('/:id/delete', verifyToken,
(req: Request, res: Response) => {
    req.body.postId = req.params.id;
    postService.delete(req.body)
        .then(deleted => res.send({message: deleted}))
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
        /*Post.findAll({
            where: {
                boardId: req.body.boardId
            }
        })*/
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err));
    }
);





// needs to be changed to get request
postController.post('/getPostsByUser',
    (req: Request, res: Response) => {
        postService.getPostsbyUser(req.body.userId)
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err));
    }
);


postController.put('/:id', verifyToken, (req: Request, res: Response) => {
    req.body.postId = req.params.id;
    req.body.postUpdate = req.body;
    postService.updatePost(req.body)
        .then(updated => res.json(updated))
        .catch(err => res.status(500).send(err));
});

postController.post('/getAllSubjects',
    (req: Request, res: Response) => {
       Subject.findAll().then(posts => {res.send(posts);
    }

       ).catch(err => {
            res.status(500).send(err); });
    }
);

postController.post('/:id/bookmark', verifyToken,
    (req: Request, res: Response) => {
        req.body.bookmark = {
            postId: req.params.id,
            userId: req.body.tokenPayload.userId
        };
        postService.bookmarkPost(req.body)
            .then(created => res.send(created))
            .catch(err => res.status(500).send(err));
    }
);

postController.get('/bookmarks', verifyToken,
    (req: Request, res: Response) => {
        postService.getBookmarkList(req.body.tokenPayload.userId)
            .then(bookmarkedPosts => res.send(bookmarkedPosts))
            .catch(err => res.status(500).send(err));
    });

postController.delete('/:id/bookmark/delete', verifyToken,
    (req: Request, res: Response) => {
        postService.deleteBookmark(parseInt(req.params.id, 10), req.body.tokenPayload.userId)
            .then(deleted => res.send({msg: deleted}))
            .catch(err => res.status(500).send(err));
    }
);
export const PostController: Router = postController;
