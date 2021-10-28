
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { checkPassword } from '../middlewares/checkPassword';
import { checkNoDuplicates } from '../middlewares/checkNoDuplicate';
import { checkNoDuplicateEmail } from '../middlewares/checkNoDuplicate';

const userController: Router = express.Router();
const userService = new UserService();


userController.post('/register', checkPassword, checkNoDuplicates, checkNoDuplicateEmail,
    (req: Request, res: Response) => {

        userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

userController.delete('/delete', verifyToken, // pathway can be adapted if necessary
    (req: Request, res: Response) => {
        userService.delete(req.body).then(response => res.send(response)).catch(err => res.status(500).send(err));
    }
);


// doesnt work yet because like object should be passed through from frontend (or arsenije has a better solution)
userController.post('/likePost',
    (req: Request, res: Response) => {
        userService.likePost(req.body.userId, req.body.postId).catch(err => res.status(500).send(err));
    }
);

export const UserController: Router = userController;
