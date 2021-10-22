
import {Post} from '../models/post.model';
const { Op } = require('sequelize');




export class PostService {
    public createPost(post: Post) {
        return Post.create(post).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    // deletes a post from the database
    public delete(post: Post): Promise<string> {
        try {
                Post.destroy({
                    where: {
                        postId: post.postId
                    }
                });
                return Promise.resolve('Post successfully deleted');
        } catch (err) {
            return Promise.reject('Deletion unsuccessful');
        }
    }

    public getAll(): Promise<Post[]> {
        return Post.findAll();
    }

    // returns all posts belongin to a specified forum
    getPostsOfBoard(board: number): Promise<Post[]> {
        return Post.findAll({
            where: {
                boardId: board
            }
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

}

