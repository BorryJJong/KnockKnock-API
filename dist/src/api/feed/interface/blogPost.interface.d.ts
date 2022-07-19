import { BlogPost } from '../../../entities/BlogPost';
export interface IGetBlogPostItems {
    items: IGetBlogPostItem[];
    pagination: IPagenationResponse;
}
export declare type IGetBlogPostItem = BlogPost;
export interface IPagenationResponse {
    skip: number;
    take: number;
    total: number;
}
