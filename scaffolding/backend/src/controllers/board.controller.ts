import express, { Router, Request, Response } from 'express';
import { request } from 'http';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { MulterRequest } from '../models/multerRequest.model';
import { PostImage } from '../models/postImage.model';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';
import { Subject } from '../models/subject.model';
import {Board} from '../models/board.model';


const boardController: Router = express.Router();


boardController.post('/getBoardsBySubjectId',
    (req: Request, res: Response) => {
        Board.findAll({
            where: {
                subjectId: req.body.subjectId}
        }).then(boards => {
            res.send(boards);
        }).catch(err => {
            res.status(500).send(err); });
    }
);

export const BoardController: Router = boardController;
