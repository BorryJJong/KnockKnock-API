import {Injectable} from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm';
import {Event} from '@entities/Event';
import {IEvent, IEventRepository} from 'src/api/home/interface/event.interface';
import {EVENT_TAP} from '@shared/enums/enum';

@Injectable()
@EntityRepository(Event)
export class EventRepository
  extends Repository<Event>
  implements IEventRepository
{
  async selectEvents(
    isLimit: boolean,
    eventTap?: EVENT_TAP,
  ): Promise<IEvent[]> {
    let queryBuilder = await this.createQueryBuilder('event');

    if (eventTap) {
      const isOngoing = eventTap === EVENT_TAP.ONGOING;
      queryBuilder = queryBuilder.where(
        `event.endDate ${isOngoing ? `>` : `<`} NOW()`,
      );

      if (isOngoing) {
        queryBuilder = queryBuilder.orWhere(`event.endDate IS NULL`);
      }
    }

    if (isLimit) {
      queryBuilder = queryBuilder.limit(4);
    }

    return queryBuilder.orderBy('event.startDate', 'DESC').getMany();
  }
}
