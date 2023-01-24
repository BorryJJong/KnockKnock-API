"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ImageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = __importStar(require("aws-sdk"));
require("dotenv/config");
const sharp_1 = __importDefault(require("sharp"));
let ImageService = ImageService_1 = class ImageService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ImageService_1.name);
        AWS.config.update({
            credentials: {
                accessKeyId: configService.get('AWS_ACCESS_KEY_ID') || '',
                secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY') || '',
            },
            region: configService.get('AWS_REGION'),
        });
        this.S3 = new AWS.S3();
        this.buketName = configService.get('AWS_S3_BUCKET_NAME') || '';
        this.region = configService.get('AWS_REGION') || '';
        this.ACL = 'public-read';
    }
    async __createBucket() {
        return await this.S3.createBucket({
            Bucket: this.buketName,
        }).promise();
    }
    __makePublicUrl(dest) {
        return `https://${this.buketName}.s3.${this.region}.amazonaws.com/${dest}`;
    }
    async uploadS3(file, folder) {
        console.log('file', file);
        const Key = await this.rename(file.originalname, file.mimetype);
        console.log('key', Key);
        folder = folder ? folder : 'common';
        try {
            const result = await this.S3.putObject({
                Bucket: `${this.buketName}/${folder}`,
                ACL: this.ACL,
                Key,
                Body: await (0, sharp_1.default)(file.buffer)
                    .toFormat('webp')
                    .webp({ quality: 80 })
                    .toBuffer(),
            }).promise();
            return {
                ok: true,
                ETag: result.ETag,
                Key: `${folder}/${Key}`,
                url: this.__makePublicUrl(`${folder}/${Key}`),
            };
        }
        catch (error) {
            this.logger.error(error);
            return { ok: false };
        }
    }
    async deleteS3(Key) {
        try {
            await this.S3.deleteObject({
                Bucket: this.buketName,
                Key,
            }).promise();
            return { ok: true };
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    rename(name, mimeType) {
        let extension;
        const newFileName = new Date().valueOf() + Math.random().toString(36).substr(2, 11);
        switch (mimeType) {
            case 'image/jpeg':
                extension = 'webp';
                break;
            case 'image/png':
                extension = 'webp';
                break;
            case 'image/gif':
                extension = 'webp';
                break;
            case 'image/bmp':
                extension = 'webp';
                break;
            default:
                extension = 'webp';
                break;
        }
        return `${newFileName}.${extension}`;
    }
};
ImageService = ImageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map