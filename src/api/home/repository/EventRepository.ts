import {Injectable} from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm';
import {Event} from '@entities/Event';
import {IEvent, IEventRepository} from 'src/api/home/interface/event.interface';

@Injectable()
@EntityRepository(Event)
export class EventRepository
  extends Repository<Event>
  implements IEventRepository
{
  async selectEvents(): Promise<IEvent[]> {
    return await this.createQueryBuilder('event').getMany();
  }
}
