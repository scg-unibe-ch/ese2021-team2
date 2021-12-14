import { BoardCreationRequest } from './../models/board.model';
import { Board } from '../models/board.model';
import { Moderator } from '../models/moderator.model';

export class BoardService {

    public getBoardsBySubjectId(subjectId: number): Promise<Board[]> {
        return new Promise((resolve, reject) => {
            Board.findAll({
                where: {
                    subjectId: subjectId
                }
            })
            .then(boards => resolve(boards))
            .catch(err => reject(err));
        });
    }

    public getBoardByBoardId(boardId: number): Promise<Board> {
        return new Promise((resolve, reject) => {
            Board.findByPk(boardId)
            .then(board => resolve(board))
            .catch(reason => reject(reason));
        });
    }

    public getOwnerId(boardId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            Board.findByPk(boardId)
            .then(board => resolve(board.ownerId))
            .catch(reason => reject(reason));
        });
    }

    public createBoard(board: BoardCreationRequest): Promise<Board> {
        return new Promise((resolve, reject) => {
            Board.create({
                subjectId: board.subjectId,
                boardName: board.boardName,
                description: board.description,
                ownerId: (board as any).tokenPayload.userId
            })
            .then(res => {
                Moderator.create({
                    userId: (board as any).tokenPayload.userId,
                    boardId: res.boardId
                });
                resolve(res);
            })
            .catch(err => reject(err));
        });
    }

    public isModerator(userId: number, boardId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Moderator.findOne({
                where: {
                    userId: userId,
                    boardId: boardId
                }
            }).then(res => {
                if (res) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}
