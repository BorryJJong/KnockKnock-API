import {Injectable} from '@nestjs/common';
import {EntityRepository, QueryRunner, Repository} from 'typeorm';
import {CreateBlogImageDTO, GetBlogImageDTO} from '../dto/feed.dto';
import {BlogImage} from 'src/entities/BlogImage';
import {IGetBlogImagesByBlogPost} from '../interface/blogImage.interface';

@Injectable()
@EntityRepository(BlogImage)
export class BlogImageRepository extends Repository<BlogImage> {
  createBlogImage(createBlogImageDTO: CreateBlogImageDTO): BlogImage {
    return this.create({...createBlogImageDTO});
  }

  async saveBlogImage(
    queryRunner: QueryRunner | null,
    blogImage: BlogImage,
  ): Promise<BlogImage> {
    if (queryRunner === null) {
      return await this.save(blogImage);
    } else {
      return await queryRunner.manager.save(blogImage);
    }
  }

  async getBlogImagesByBlogPost(
    blogPostIds: number[],
  ): Promise<IGetBlogImagesByBlogPost[]> {
    if (blogPostIds.length === 0) {
      return [];
    }

    const blogImages = await this.createQueryBuilder('blogImage')
      .where('blogImage.postId IN (:...postIds)', {
        postIds: blogPostIds,
      })
      .getMany();

    return blogImages;
  }

  async getBlogImageByPostId(id: number) {
    const images: GetBlogImageDTO[] = await this.find({
      select: ['id', 'fileUrl'],
      where: {postId: id},
    });

    return images;
  }

  async deleteBlogImageByPostId(
    queryRunner: QueryRunner,
    postId: number,
  ): Promise<void> {
    await this.createQueryBuilder('blogImage', queryRunner)
      .delete()
      .from(BlogImage)
      .where('postId = :postId', {
        postId,
      })
      .execute();
  }
}
