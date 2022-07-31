/// <reference types="multer" />
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/feed.dto';
import { UpdateFeedDto } from './dto/feed.dto';
import { FeedCreateResponse } from 'src/shared/response_entities/feed/temp.response';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    create(files: Express.Multer.File[], body: CreateFeedDto): Promise<FeedCreateResponse>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFeedDto: UpdateFeedDto): string;
    remove(id: string): string;
}
