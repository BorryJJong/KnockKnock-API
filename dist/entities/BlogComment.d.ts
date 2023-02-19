export interface IBlogComment {
    id: number;
    postId: number;
    userId: number;
    content: string;
    commentId: number | null;
    regDate: Date;
    delDate?: Date;
}
export declare class BlogComment implements IBlogComment {
    id: number;
    postId: number;
    userId: number;
    content: string;
    commentId: number | null;
    regDate: Date;
    delDate?: Date;
}
