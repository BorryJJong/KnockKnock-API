import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GetPromotionResDTO} from 'src/api/promotions/dto/promotions.dto';
import {IPromotionsRepository} from 'src/api/promotions/promotions.interface';
import {PromotionsRepository} from 'src/api/promotions/promotions.repository';
@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(PromotionsRepository)
    private readonly promotionsRepository: IPromotionsRepository,
  ) {}

  async getListPromotion(): Promise<GetPromotionResDTO[]> {
    const promotions = await this.promotionsRepository.selectPromotions();
    return promotions.map(p => new GetPromotionResDTO(p.id, p.type));
  }
}
