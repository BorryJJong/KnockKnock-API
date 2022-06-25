import {Injectable} from '@nestjs/common';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';
import {CreateBlogImageDTO} from './dto/feed.dto';
import {BlogImage} from 'src/entities/BlogImage';

@Injectable()
@EntityRepository(BlogImage)
export class BlogImageRepository extends Repository<BlogImage> {
  createBlogImage(createBlogImageDTO: CreateBlogImageDTO): BlogImage {
    return this.create({...createBlogImageDTO});
  }

  async saveBlogImage(queryRunner: QueryRunner | null, blogImage: BlogImage): Promise<BlogImage> {
    if(queryRunner === null){
        return await this.save(blogImage);
    } else {
        return await queryRunner.manager.save(blogImage);
    }
  }
}
