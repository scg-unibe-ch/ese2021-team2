import { PostAttributes} from './post.model';
import {BookmarkAttributes} from './bookmark.model';

export interface CreatePostRequest {
    post: PostAttributes;
    tokenPayload: any;
}

export interface DeletePostRequest {
    postId: number;
    tokenPayload: any;
}

export interface UpdatePostRequest {
    postId: number;
    postUpdate: PostAttributes;
    tokenPayload: any;
}

export interface BookmarkPostRequest {
    bookmark: BookmarkAttributes;
    tokenPayload: any;
}


