import { upload } from '../middlewares/fileFilter';
import { MulterRequest } from '../models/multerRequest.model';
import { PostImage, PostImageAttributes } from '../models/postImage.model';
import {Post, PostAttributes} from '../models/post.model';
import {
    BookmarkPostRequest,
    CreatePostRequest,
    DeletePostRequest,
    UpdatePostRequest
} from '../models/postRequest.model';
import {UserService} from './user.service';
import {rejects} from 'assert';
import {Bookmark} from '../models/bookmark.model';
import { Subscription } from '../models/subscription.model';
const { Op } = require('sequelize');

const userService = new UserService();

export class PostService {

    public getSubscribedBoardByUserId(userId: number) {
        return Subscription.findAll({
            where: {
                userId: userId
            },
        });
    }

    // returns all posts belonging to a specified forum
    public getPostsOfBoard(boardId: number): Promise<Post[]> {
        return Post.findAll({
            where: {
                boardId: boardId
            },
            order: [['createdAt', 'DESC']]
        });
    }

    public async getPostsbyBoardIds(boardIds: Subscription[]) {
        const out = [];
        for (let i = 0; i < boardIds.length; i++) {
            let postsOfBoard;
            postsOfBoard = await this.getPostsOfBoard(boardIds[i].boardId);
            for (let j = 0; j < postsOfBoard.length; j++) {
                out.push(postsOfBoard[j]);
            }
        }
        return out;
    }

    public createPost(createReq: CreatePostRequest): Promise<PostAttributes> {
        return userService.getUser(createReq.tokenPayload.userId)
            .then(user => {
                if (user != null) {
                    if ( this.postReqIsValid(createReq.post)) {
                        createReq.post.creatorId = user.userId;
                        return Post.create(createReq.post)
                            .then(inserted => Promise.resolve(inserted))
                            .catch(err => Promise.reject(err));
                    } else {
                        return Promise.reject('wrong post format');
                    }
                } else {
                    return Promise.reject('Something happened wrong');
                }
            });
    }

    public getPost(postId: number): Promise<Post> {
        return Post.findByPk(postId);
    }
    public getCreatorId(postId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            Post.findByPk(postId)
            .then(post => resolve(post.creatorId))
            .catch(reason => reject(reason));
        });
    }

    public addImage(req: MulterRequest): Promise<PostImageAttributes> {

        return Post.findByPk(req.params.postId)
            .then(found => {
                if (!found) {
                    return Promise.reject('Post not found!');
                } else {
                    return new Promise<PostImageAttributes>((resolve, reject) => {
                        upload.single('image')(req, null, (error: any) => {
                            PostImage.create({fileName: req.file.filename, postId: found.postId})
                                .then(created => resolve(created))
                                .catch(err => reject('Could not upload image'));
                        });
                    });
                }
            })
            .catch(err => Promise.reject('Could not upload image'));
    }


    // deletes a post from the database
    public deletePost(deleteReq: DeletePostRequest): Promise<string> {
            return Post.findByPk(deleteReq.postId)
                .then(found => {
                    if (found != null) {
                        Post.destroy({
                                where: {
                                    postId: found.postId
                                }
                            })
                        .then(deleted => Promise.resolve('Deleting successful ' + deleted))
                        .catch(err => Promise.reject(err));
                    } else {
                        return Promise.reject('No Post found');
                    }
                })
                .catch(err => Promise.reject(err));
    }


    // update post
    public updatePost(updateReq: UpdatePostRequest): Promise<Post> {
        return userService.getUser(updateReq.tokenPayload.userId)
            .then(user => {
                return Post.findByPk(updateReq.postId)
                    .then(found => {
                        if (found != null) {
                            if (!(found.creatorId - user.userId) ) {
                                Post.update(updateReq.postUpdate,
                                    {
                                        where: {postId: updateReq.postId}
                                    })
                                    .then(post => {
                                        return Promise.resolve({post});
                                    })
                                    .catch(err => Promise.reject(err));
                            } else {
                                return Promise.reject({ message: 'Not authorized to update this post' });
                            }
                        } else {
                            return Promise.reject({ message: 'Post not found' });
                        }
                    })
                    .catch(err => Promise.reject(err));
            })
            .catch(err => Promise.reject(err));
    }

    public bookmarkPost(bookmarkReq: BookmarkPostRequest): Promise<Bookmark> {
        return userService.getUser(bookmarkReq.tokenPayload.userId)
            .then((user) => {
                return Post.findByPk(bookmarkReq.bookmark.postId)
                    .then(found => {
                        if (found != null) {
                             return Bookmark.findOne({
                                where: {
                                    userId: user.userId,
                                    postId: found.postId
                                }
                            })
                                .then(bookmark => {
                                    if (bookmark != null) {
                                        return Promise.reject({ message: 'Already bookmarked'});
                                    } else {
                                         Bookmark.create(bookmarkReq.bookmark)
                                            .then(created => {
                                                return Promise.resolve({created});
                                            })
                                            .catch(err => Promise.reject(err));
                                    }
                                })
                                .catch(err => Promise.reject(err));
                        } else {
                            return Promise.reject({ message: 'Post not found' });
                        }
                    })
                    .catch(err => Promise.reject(err));
            })
            .catch(err => Promise.reject(err));
    }

    public deleteBookmark(postId: number, userId: number): Promise<string> {
        return Bookmark.destroy(
            {
                where: {
                    postId: postId,
                    userId: userId
                }
            }
        )
            .then(() => Promise.resolve('Delete successful'))
            .catch((err) => Promise.reject('Something happened wrong when deleting the bookmark'));
    }

    public getAll(): Promise<Post[]> {
        return Post.findAll();
    }

    // returns all posts belongin to a User
    getPostsbyUser(userId: number): Promise<Post[]> {
        return Post.findAll({
            where: {
                creatorId: userId
            }
        });
    }


    public async getBookmarkList(userId: number): Promise<Post[]> {
        const bookmarkedPosts: Bookmark[] = await Bookmark.findAll({
            where: {
                userId: userId
            }
        });
        const posts: Post[] = [];
        if (bookmarkedPosts != null) {
            for (const bookmark of bookmarkedPosts) {
                await Post.findByPk(bookmark.postId)
                    .then(found => {
                        posts.push(found);
                    });
            }
            return posts;
        } else {
            return Promise.reject('no bookmarked posts');
        }
    }

    public async getBookmarkStatus(userId: number, postId: number): Promise<boolean> {
        return Bookmark.findOne({
            where: {
                postId: postId,
                userId: userId
            }
        })
            .then(found => {
                if (found) {
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                return Promise.reject('Something happened wrong');

            });
    }


    postReqIsValid(post: PostAttributes): boolean {
        return !!post.title;
    }
}

