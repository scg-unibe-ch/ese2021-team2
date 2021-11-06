import { Board} from '../models/board.model';
import { Subject } from '../models/subject.model';

export class BoardService {
    public getAll(): Promise<Board[]> {
        return Board.findAll();
    }

    getBoards(subject: number): Promise<Board[]> {
        return Board.findAll({
            where: {
                subjectId: subject
            }
        });
    }

    getSubject(subjId: number): Promise<Subject> {
        return Subject.findOne({
            where: {
                subjectId: subjId
            }
        });
    }
}
