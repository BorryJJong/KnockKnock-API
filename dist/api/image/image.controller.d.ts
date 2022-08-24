/// <reference types="multer" />
import { ImageService } from './image.service';
import 'dotenv/config';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    uploadImage(file: Express.Multer.File, body: any): Promise<{
        ok: boolean;
        ETag: string;
        Key: string;
        url: string;
    } | {
        ok: boolean;
        ETag?: undefined;
        Key?: undefined;
        url?: undefined;
    }>;
}
