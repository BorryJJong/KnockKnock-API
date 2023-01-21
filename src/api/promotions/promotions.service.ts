import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Promotions} from 'src/entities/Promotions';
import {Repository} from 'typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotions)
    private promotionsRepository: Repository<Promotions>,
  ) {}

  async findAll() {
    return this.promotionsRepository.createQueryBuilder('promotions').getMany();
  }
}
