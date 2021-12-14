import { PostComment } from '../models/postComment.model';

export class PostCommentService {

    public createPostComment(postcomment: PostComment) {
        return PostComment.create(postcomment)
            .then(inserted => Promise.resolve(inserted))
            .catch(err => Promise.reject(err));
    }

    public getCreatorId(postCommentId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            PostComment.findByPk(postCommentId)
            .then(postComment => resolve(postComment.userId))
            .catch(reason => reject(reason));
        });
    }
}
