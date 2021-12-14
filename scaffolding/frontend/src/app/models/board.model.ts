export class Board {
    constructor(
        public boardId: number,
        public subjectId: number,
        public boardName: string,
        public description: string,
        public ownerId: number
    ) {
    }
}