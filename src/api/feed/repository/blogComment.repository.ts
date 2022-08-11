import {Injectable} from '@nestjs/common';
import {EntityRepository, getManager, QueryRunner, Repository} from 'typeorm';
import {BlogComment} from 'src/entities/BlogComment';
import { InsBlogCommentDTO } from '../dto/feed.dto';

@Injectable()
@EntityRepository(BlogComment)
export class BlogCommentRepository extends Repository<BlogComment> {
  createBlogComment(insBlogCommentDTO: InsBlogCommentDTO): BlogComment {
    return this.create({...insBlogCommentDTO});
  }

  async saveBlogComment(queryRunner: QueryRunner | null, BlogComment: BlogComment): Promise<BlogComment> {
    if(queryRunner === null){
        return await this.save(BlogComment);
    } else {
        return await queryRunner.manager.save(BlogComment);
    }
  }
}