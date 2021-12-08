import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { checkPassword } from '../middlewares/checkPassword';
import { checkNoDuplicates } from '../middlewares/checkNoDuplicate';
import { checkNoDuplicateEmail } from '../middlewares/checkNoDuplicate';
import { MulterRequest } from '../models/multerRequest.model';
import { upload } from '../middlewares/fileFilter';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register', checkPassword, checkNoDuplicates, checkNoDuplicateEmail,
    (req: Request, res: Response) => {
        userService.register(req.body)
            .then(registered => res.send(registered))
            .catch(err => res.status(500).send(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body)
            .then(login => res.send(login))
            .catch(err => res.status(500).send(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getUser(req.body.tokenPayload.userId)
            .then(user => res.send(user))
            .catch(err => res.status(500).send(err));
    }
);

userController.get('/user/:userId',
    (req: Request, res: Response) => {
        userService.getUser(parseInt(req.params.userId, 10))
            .then(user => res.send({username: user.userName, image: user.profile_image}))
            .catch(err => res.status(500).send(err));
    }
);

userController.delete('/delete', verifyToken, // pathway can be adapted if necessary
    (req: Request, res: Response) => {
        userService.delete(req.body)
            .then(response => res.sendStatus(204))
            .catch(err => res.status(500).send(err));
    }
);

userController.put('/update', verifyToken,
    (req: Request, res: Response) => {
        userService.update(req.body)
            .then(response => {res.send(response); })
            .catch(err => res.status(500).send(err));
    });

userController.post('/likePost',
    (req: Request, res: Response) => {

        userService.likePost(req.body).catch(err => {
            console.log(err);

            res.status(500).send(err);
        });

    }
);

// add image to a todoItem
userController.post('/:id/image', upload.single('image'), (req: MulterRequest, res: Response) => {
    console.log('file in controller' + req.file);
    userService.updateProfileImage(req)
        .then(created => res.send(created))
        .catch(err => res.status(500).send(err));
});

// get the filename of an image
userController.get('/:id/image', (req: Request, res: Response) => {
    userService.getProfileImage(Number(req.params.id)).then(products => {
        res.sendFile(products, { root: process.cwd()});
    })
        .catch(err => res.status(500).send(err));
});

// get the filename of an image
userController.delete('/:id/image', (req: Request, res: Response) => {
    userService.deleteProfileImage(Number(req.params.id)).then(response => res.status(204).send(response))
        .catch(err => res.status(500).send(err));
});


export const UserController: Router = userController;
