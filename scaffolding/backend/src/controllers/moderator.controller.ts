import express, {Request, Response, Router} from 'express';
import {ModeratorService} from '../services/moderator.service';
import {checkModOrPostCreator} from '../middlewares/checkModOrPostCreator';

const moderatorController: Router = express.Router();
const moderatorService: ModeratorService = new ModeratorService();

moderatorController.get('/:postId/', checkModOrPostCreator,
    (req: Request, res: Response) => {
        res.send(true);
    }
);

moderatorController.post( '/', checkModOrPostCreator,
    (req: Request, res: Response) => {
        moderatorService.makeModerator(req.body.userId, req.body.boardId)
            .then(() => res.status(200).send())
            .catch(err => res.status(500).send(err));
    }
);

export const ModeratorController: Router = moderatorController;
