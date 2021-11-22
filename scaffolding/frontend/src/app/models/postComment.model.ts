export class PostCommentModel {

    constructor(
        public postCommentId: number,
        public postId: number,
        public commentText: string,
        public userId: number,
        public userName: string
    ){}

}


