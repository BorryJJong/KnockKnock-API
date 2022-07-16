export declare class BlogComment {
    id: number;
    postId: number;
    userId: number;
    content: string;
    commentId: number | null;
    regDate: Date;
    delDate?: Date;
    isDeleted: boolean;
    beforeInsert(): void;
}
