import {Module} from '@nestjs/common';
import {PromotionsService} from './promotions.service';
import {PromotionsController} from './promotions.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PromotionsRepository} from 'src/api/promotions/promotions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionsRepository])],
  controllers: [PromotionsController],
  providers: [PromotionsService],
})
export class PromotionsModule {}
