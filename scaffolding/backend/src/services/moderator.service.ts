import {Moderator} from '../models/moderator.model';

export class ModeratorService {

    public isModerator(userId: number, boardId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Moderator.findOne({
                where: {
                    userId: userId,
                    boardId: boardId
                }
            }).then(moderator => {
                if (moderator) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    public makeModerator(userId: number, boardId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            Moderator.create({
                userId: userId,
                boardId: boardId
            })
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }
}
