import { SubjectService } from './../services/subject.service';
import { checkAdmin } from '../middlewares/checkAdmin';
import express, { Router, Request, Response } from 'express';

const subjectController: Router = express.Router();
const subjectService: SubjectService = new SubjectService();

subjectController.get('/',
    (req: Request, res: Response) => {
        subjectService.getAllSubjects()
            .then(subjects => res.send(subjects))
            .catch(err => res.status(500).send(err));
    }
);

subjectController.post('/create', checkAdmin,
    (req: Request, res: Response) => {
        subjectService.createSubject(req.body.name)
            .then(subject => res.send(subject))
            .catch(err => res.status(500).send(err));
    }
);

subjectController.put('/:subjectId/modify', checkAdmin,
    (req: Request, res: Response) => {
        req.body.subjectId = req.params.subjectId;
        subjectService.modifySubject(req.body)
            .then(subject => res.send(subject))
            .catch(err => res.status(500).send(err));
    }
);

subjectController.delete('/:subjectId/delete', checkAdmin,
    (req: Request, res: Response) => {
        subjectService.deleteSubject(Number(req.params.subjectId))
            .then(() => res.status(200).send())
            .catch(err => res.status(500).send(err));
    }
);

export const SubjectController: Router = subjectController;
