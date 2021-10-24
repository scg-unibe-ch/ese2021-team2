import { User } from "./user.model";


export class Post {

    constructor(
        public postId: number,
        public title: string,
        public content: string,
        public likes: number,
        public date: string,
        public boardId: number,
        public creatorId: number,
        public semester: string,
        public tags: string[],
        public postImage: string | undefined
    ) {
    

    }
   }