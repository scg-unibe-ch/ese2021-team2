import { upload } from '../middlewares/fileFilter';
import { MulterRequest } from '../models/multerRequest.model';
import { PostImage, PostImageAttributes } from '../models/postImage.model';
import {Post, PostAttributes} from '../models/post.model';
import {CreatePostRequest, DeletePostRequest, UpdatePostRequest} from '../models/postRequest.model';
import {UserService} from './user.service';
import {rejects} from 'assert';
const { Op } = require('sequelize');

const userService = new UserService();

export class PostService {
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
                               if (!(found.creatorId - deleteReq.tokenPayload.userId)) {
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
                            if (!(found.creatorId - user.userId)) {
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

