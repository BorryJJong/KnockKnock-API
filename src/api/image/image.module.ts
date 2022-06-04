import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ImageController} from './image.controller';
import {ImageService} from './image.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
  imports: [ConfigModule],
})
export class ImageModule {}
