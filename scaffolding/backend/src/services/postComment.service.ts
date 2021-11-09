import { PostComment } from '../models/postComment.model';

export class PostCommentService {
    public createPostComment(postcomment: PostComment) {
        return PostComment.create(postcomment)
            .then(inserted => Promise.resolve(inserted))
            .catch(err => Promise.reject(err));
    }
}
