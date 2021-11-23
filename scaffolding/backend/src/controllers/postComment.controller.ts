import express, { Router, Request, Response } from 'express';
import {PostComment} from '../models/postComment.model';
import {PostCommentService} from '../services/postComment.service';
import {TodoList} from '../models/todolist.model';

const postCommentController: Router = express.Router();
const postCommentService = new PostCommentService;

postCommentController.post('/getCommentsByPostId',
    (req: Request, res: Response) => {
        PostComment.findAll({
            where: {
                postId: req.body.postId}
        }).then(boards => {
            res.send(boards);
        }).catch(err => {
            res.status(500).send(err); });
    }
);

postCommentController.post('/createComment',
    (req: Request, res: Response) => {
        postCommentService.createPostComment(req.body)
            .then(created => res.send(created))
            .catch(err => res.status(500).send(err));
    }
);

export const PostCommentController: Router = postCommentController;