/// <reference types="multer" />
import { ImageService } from './image.service';
import 'dotenv/config';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    uploadImage(file: Express.Multer.File): Promise<import("./image.service").IUploadS3Response>;
}
