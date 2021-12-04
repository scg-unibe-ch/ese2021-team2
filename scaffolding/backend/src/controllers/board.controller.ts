import express, { Router, Request, Response } from 'express';
import {Board} from '../models/board.model';
import { Subscription } from '../models/subscription.model';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';


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


boardController.post('/getBoardByBoardId',
    (req: Request, res: Response) => {
        Board.findAll({
            where: {
                boardId: req.body.boardId}
        }).then(boards => {
            res.send(boards);
        }).catch(err => {
            res.status(500).send(err); });
    }
);

boardController.post('/getSubscribedPostsByUserId',
    async (req: Request, res: Response) => {
        try {
        const boardIds: Subscription[] = await PostService.getSubscribedBoardByUserId(req.body.userId);

        res.send(await PostService.getPostsbyBoardids(boardIds));



        } catch (err) {
            res.status(500).send(err); }
    }
);


boardController.post('/subscribe',
    (req: Request, res: Response) => {

        const out =  Subscription.create(req.body)
        .then(inserted => Promise.resolve(inserted))
        .catch(err => Promise.reject(err));
        console.log('SUB CREATED');

    return out;
    }
);

boardController.post('/isUserNotSubscribed',
    (req: Request, res: Response) => {
        try {
        Subscription.findAll({
            where: {
                boardId: req.body.boardId,
                userId: req.body.userId
            }
        }).then(
            boards => {
                if (boards.length > 0) {
                    res.send(false);
                } else {
                    res.send(true);
                }
            }
        );
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

boardController.post('/getMyLectures',
    (req: Request, res: Response) => {
        try {
            Subscription.findAll({
                where: {
                    userId: req.body.userId
                }
            }).then(
                async boards => {
                    const out = [];

                    for (let i = 0; i < boards.length; i++) {
                        const board = await Board.findByPk(boards[i].boardId);
                        out.push(board);
                    }
                    res.send(out);
                }
            );
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

export const BoardController: Router = boardController;
