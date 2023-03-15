/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { S3_OBJECT } from '@shared/enums/enum';
import * as AWS from 'aws-sdk';
import 'dotenv/config';
export interface IUploadS3Response {
    ok: boolean;
    ETag?: string | undefined;
    Key?: string;
    url?: string;
}
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
    uploadS3(file: Express.Multer.File, folder?: string): Promise<IUploadS3Response>;
    deleteS3(Key: string): Promise<{
        ok: boolean;
    } | undefined>;
    rename(name: string, mimeType: string): string;
    getFileFullUrl(s3Object: S3_OBJECT, imageUrl: string): string;
}
