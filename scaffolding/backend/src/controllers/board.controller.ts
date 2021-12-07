import express, { Router, Request, Response } from 'express';
import { BoardService } from './../services/board.service';
import { verifyToken } from './../middlewares/checkAuth';
import { Board } from '../models/board.model';
import { Subscription } from '../models/subscription.model';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

const boardController: Router = express.Router();
const boardService: BoardService = new BoardService();
const postService: PostService = new PostService();

boardController.get('/bySubjectId',
    (req: Request, res: Response) => {
        boardService.getBoardsBySubjectId(req.body.subjectId)
            .then(boards => res.send(boards))
            .catch(err => res.status(500).send(err));
    }
);

boardController.get('/byBoardId',
    (req: Request, res: Response) => {
        boardService.getBoardByBoardId(req.body.boardId)
            .then(boards => res.send(boards))
            .catch(err => res.status(500).send(err));
    }
);

boardController.post('/create', verifyToken,
    (req: Request, res: Response) => {
        boardService.createBoard(req.body)
            .then(board => res.send(board))
            .catch(err => res.status(500).send(err));
    }
);

boardController.get('/owner',
    (req: Request, res: Response) => {
        boardService.getOwnerId(req.body.boardId)
            .then(ownerId => res.send(ownerId))
            .catch(err => res.status(500).send(err));
    }
);

boardController.post('/getSubscribedPostsByUserId',
    async (req: Request, res: Response) => {
        try {
            const boardIds: Subscription[] = await postService.getSubscribedBoardByUserId(req.body.userId);
            res.send(await postService.getPostsbyBoardIds(boardIds));
        } catch (err) {
            res.status(500).send(err);
        }
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
                    console.log(boards);
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

// Is this needed?
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

export const BoardController: Router = boardController;
