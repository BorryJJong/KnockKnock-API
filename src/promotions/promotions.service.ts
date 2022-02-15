import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotions } from 'src/entities/Promotions';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotions)
    private promotionsRepository: Repository<Promotions>,
  ) {}
  // create(createPromotionDto: CreatePromotionDto) {
  //   return 'This action adds a new promotion';
  // }

  async findAll() {
    return this.promotionsRepository.createQueryBuilder('promotions').getMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} promotion`;
  // }

  // update(id: number, updatePromotionDto: UpdatePromotionDto) {
  //   return `This action updates a #${id} promotion`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} promotion`;
  // }
}
