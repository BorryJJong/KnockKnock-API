import {Injectable} from '@nestjs/common';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';
import {CreateBlogPostDTO} from './dto/feed.dto';
import {BlogPost} from 'src/entities/BlogPost';

@Injectable()
@EntityRepository(BlogPost)
export class BlogPostRepository extends Repository<BlogPost> {
  createBlogPost(createBlogPostDTO: CreateBlogPostDTO): BlogPost {
    return this.create({...createBlogPostDTO});
  }

  async saveBlogPost(
    queryRunner: QueryRunner | null,
    blogPost: BlogPost,
  ): Promise<BlogPost> {
    if (queryRunner === null) {
      return await this.save(blogPost);
    } else {
      return await queryRunner.manager.save(blogPost);
    }
  }
}
