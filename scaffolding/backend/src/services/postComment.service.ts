import { Post } from './../models/post.model';
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

    public getPost(postCommentId: number): Promise<Post> {
        return new Promise((resolve, reject) => {
            PostComment.findByPk(postCommentId)
            .then(postComment => {
                Post.findByPk(postComment.postId)
                .then(post => resolve(post))
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        });
    }

    public deletePostComment(postCommentId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            PostComment.destroy({
                where: {
                    postCommentId: postCommentId
                }
            })
            .then(() => resolve())
            .catch(err => reject(err));
        });
    }
}
