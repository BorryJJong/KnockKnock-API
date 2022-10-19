import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './users.repository';
import {AuthModule} from '../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
