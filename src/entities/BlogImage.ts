import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('blog_image', {schema: 'knockknock'})
export class BlogImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'post_id',
    type: 'int',
    nullable: false,
    comment: '게시글 아이디',
  })
  postId: number;

  @Column({
    name: 'file_url',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '게시물 업로드 파일 경로',
  })
  fileUrl: string;
}
