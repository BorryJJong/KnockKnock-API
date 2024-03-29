import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './users.repository';
import {AuthModule} from '../../auth/auth.module';
import {UserValidator} from 'src/api/users/users.validator';
import {KakaoService} from 'src/auth/kakao.service';
import {AppleService} from 'src/auth/apple.service';
import {ImageService} from 'src/api/image/image.service';
import {ConfigService} from '@nestjs/config';
import {BlogPostRepository} from 'src/api/feed/repository/blogPost.repository';
import {UserToBlogPostHideRepository} from 'src/api/feed/repository/UserToBlogPostHide.repository';
import {UserReportBlogPostRepository} from 'src/api/feed/repository/UserReportBlogPost.repository';
import {UserToBlockUserRepository} from 'src/api/users/repository/UserToBlockUser.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      BlogPostRepository,
      UserToBlogPostHideRepository,
      UserReportBlogPostRepository,
      UserToBlockUserRepository,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserValidator,
    KakaoService,
    AppleService,
    ImageService,
    ConfigService,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
