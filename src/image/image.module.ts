import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
  imports: [ConfigModule],
})
export class ImageModule {}
