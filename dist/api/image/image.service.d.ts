/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import 'dotenv/config';
export declare class ImageService {
    private readonly configService;
    private readonly S3;
    private readonly region;
    private readonly buketName;
    private readonly ACL;
    private readonly logger;
    constructor(configService: ConfigService);
    __createBucket(): Promise<import("aws-sdk/lib/request").PromiseResult<AWS.S3.CreateBucketOutput, AWS.AWSError>>;
    __makePublicUrl(dest: any): string;
    uploadS3(file: Express.Multer.File, folder?: string): Promise<{
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
    deleteS3(Key: string): Promise<{
        ok: boolean;
    }>;
    rename(name: string, mimeType: string): string;
}
