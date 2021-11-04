import { PostAttributes} from './post.model';

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


