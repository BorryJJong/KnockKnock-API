/// <reference types="multer" />
import { FeedService } from './feed.service';
import { CreateFeedDTO, UpdateFeedDTO, GetListFeedReqDTO as GetFeedReqDTO, GetListFeedResDTO } from './dto/feed.dto';
import { FeedCreateResponse } from 'src/shared/response_entities/feed/temp.response';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    getFeedsByChallengesFilter(query: GetFeedReqDTO): Promise<GetListFeedResDTO>;
    create(files: Express.Multer.File[], createFeedDTO: CreateFeedDTO): Promise<FeedCreateResponse>;
    findOne(id: string): string;
    update(id: string, updateFeedDTO: UpdateFeedDTO): string;
    remove(id: string): string;
}
