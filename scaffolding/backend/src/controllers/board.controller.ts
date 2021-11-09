import express, { Router, Request, Response } from 'express';
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

export const BoardController: Router = boardController;
