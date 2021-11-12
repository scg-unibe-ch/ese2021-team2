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
const { Op } = require('sequelize');

const userService = new UserService();

export class PostService {
    public createPost(createReq: CreatePostRequest): Promise<PostAttributes> {
        return userService.getUser(createReq.tokenPayload.userId)
            .then(user => {
                if (user != null) {
                    if (user.admin === false) {
                        if ( this.postReqIsValid(createReq.post)) {
                            createReq.post.creatorId = user.userId;
                            return Post.create(createReq.post)
                                .then(inserted => Promise.resolve(inserted))
                                .catch(err => Promise.reject(err));
                        } else {
                            return Promise.reject('wrong post format');
                        }
                    } else {
                        console.log('u r admin');
                        return Promise.reject('Admins aren\'t allowed to create posts');
                    }
                } else {
                    return Promise.reject('Something happened wrong');
                }
            });
    }

    public addImage(req: MulterRequest): Promise<PostImageAttributes> {

        return Post.findByPk(req.params.id)
        .then(found => {
            if (!found) {
                return Promise.reject('Post not found!');
            } else {
                return new Promise<PostImageAttributes>((resolve, reject) => {
                    upload.single('image')(req, null, (error: any) => {
                        PostImage.create({ fileName: req.file.filename, postId: found.postId })
                            .then(created => resolve(created))
                            .catch(err => reject('Could not upload image'));
                    });
                });
            }
        })
        .catch(err => Promise.reject('Could not upload image'));
}


    // deletes a post from the database
    public delete(deleteReq: DeletePostRequest): Promise<string> {
           return userService.getUser(deleteReq.tokenPayload.userId)
               .then(user => {
                   return Post.findByPk(deleteReq.postId)
                       .then(found => {
                           if (found != null) {
                               if (!(found.creatorId - deleteReq.tokenPayload.userId) || user.admin) {
                                   console.log('Destroying');
                                   Post.destroy({
                                           where: {
                                               postId: found.postId
                                           }
                                       }
                                   ).then(deleted => Promise.resolve('Deleting successful ' + deleted))
                                   .catch(err => Promise.reject(err));
                               } else {
                                   return Promise.reject('not authorized to delete this post');
                               }
                           } else {
                               return Promise.reject('No Post found');
                           }
                       })
                   .catch(err => Promise.reject(err));
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
                            if (!(found.creatorId - user.userId) || user.admin ) {
                                Post.update(updateReq.postUpdate,
                                    {
                                        where: {postId: updateReq.postId}
                                    })
                                    .then(post => {
                                        return Promise.resolve(post);
                                    })
                                    .catch(err => Promise.reject(err));
                            } else {
                                return Promise.reject('Not authorized to update this post');
                            }
                        } else {
                            return Promise.reject('Post not found');
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
                                Bookmark.create(bookmarkReq.bookmark)
                                    .then(bookmark => {
                                        return Promise.resolve(bookmark);
                                    })
                                    .catch(err => Promise.reject(err));
                            } else {
                            return Promise.reject('Post not found');
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
            .catch((err) => Promise.reject('Something happened wrong when deleting bookmark'));
    }

    public getAll(): Promise<Post[]> {
        return Post.findAll();
    }

    // returns all posts belonging to a specified forum
    getPostsOfBoard(board: number): Promise<Post[]> {
        return Post.findAll({
            where: {
                boardId: board
            },
            order: [['createdAt', 'DESC' ]]
        });
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
            console.log(bookmarkedPosts.length + ' so many bookmarked posts');
            for (const bookmark of bookmarkedPosts) {
                await Post.findByPk(bookmark.postId)
                    .then(found => {
                        console.log('found a post');
                        posts.push(found);
                    });
            }
            console.log(posts.length);
            return posts;
        } else {
            return Promise.reject('no bookmarked posts');
        }
    }

    // returns a post with a specific id
    getPostsbyId(pId: number): Promise<Post[]> {
        return Post.findAll({
            where: {
                postId: pId
            }
        });
    }

    postReqIsValid(post: PostAttributes): boolean {
        return !!post.title;
    }
}

