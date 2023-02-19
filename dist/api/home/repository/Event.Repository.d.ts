import { Repository } from 'typeorm';
import { Event } from '@entities/Event';
import { IEvent, IEventRepository } from 'src/api/home/interface/event.interface';
import { EVENT_TAP } from '@shared/enums/enum';
export declare class EventRepository extends Repository<Event> implements IEventRepository {
    selectEvents(isLimit: boolean, eventTap?: EVENT_TAP): Promise<IEvent[]>;
}
