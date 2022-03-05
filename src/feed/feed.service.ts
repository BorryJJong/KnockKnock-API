import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogChallenges } from 'src/entities/BlogChallenges';
import { BlogImage } from 'src/entities/BlogImage';
import { BlogPost } from 'src/entities/BlogPost';
import { BlogPromotion } from 'src/entities/BlogPromotion';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
    @InjectRepository(BlogChallenges)
    private blogChallengesMembersRepository: Repository<BlogChallenges>,
    @InjectRepository(BlogPromotion)
    private blogPromotionMembersRepository: Repository<BlogPromotion>,
    @InjectRepository(BlogImage)
    private blogImageRepository: Repository<BlogImage>,
  ) {}

  async create(createFeedDto: CreateFeedDto) {
    // 트랜지션 스타트
    // 1. 포스트 저장
    // 2. 챌린지 저장
    // 3. 프로모션 저장
    // 4. 이미지 저장
    // 트랜지션 종료
    return 'This action adds a new feed';
  }

  async savePost() {}
  async saveChallenges() {}
  async savePromotion() {}
  async saveImage() {}

  findAll() {
    return `This action returns all feed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
