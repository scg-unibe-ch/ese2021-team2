import express, { Router, Request, Response } from 'express';
import { BoardService} from '../services/board.service';


const boardController: Router = express.Router();
const boardService = new BoardService;

boardController.post('/getBoardsBySubject',
    (req: Request, res: Response) => {
        boardService.getBoards(req.body.subjectId)
            .then(boards => res.send(boards))
            .catch(err => res.status(500).send(err));
    }
);

boardController.post('/getSubjectById',
    (req: Request, res: Response) => {
    boardService.getSubject(req.body.subjectId)
        .then(subject => res.send(subject))
        .catch(err => res.status(500).send(err));
    }
);



export const BoardController: Router = boardController;
