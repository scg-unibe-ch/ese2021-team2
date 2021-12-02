import express, { Router, Request, Response } from 'express';
import { BoardService } from './../services/board.service';
import { verifyToken } from './../middlewares/checkAuth';

const boardController: Router = express.Router();
const boardService: BoardService = new BoardService();

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

export const BoardController: Router = boardController;
