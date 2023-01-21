import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MyPageController} from 'src/api/my-page/myPage.controller';
import {MyPageService} from 'src/api/my-page/myPage.service';
import {UserRepository} from 'src/api/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [MyPageController],
  providers: [MyPageService],
})
export class MyPageModule {}
