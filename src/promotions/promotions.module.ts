import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotions } from 'src/entities/Promotions';

@Module({
  imports: [TypeOrmModule.forFeature([Promotions])],
  controllers: [PromotionsController],
  providers: [PromotionsService],
})
export class PromotionsModule {}
