import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './users.repository';
import {AuthModule} from '../../auth/auth.module';
import {UserValidator} from 'src/api/users/users.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserValidator],
  exports: [UsersService],
})
export class UsersModule {}
