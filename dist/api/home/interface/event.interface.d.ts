import { EVENT_TAP } from '@shared/enums/enum';
export interface IEventRepository {
    selectEvents(eventTap?: EVENT_TAP): Promise<IEvent[]>;
}
export interface IEvent {
    id: number;
    title: string;
    image: string;
    url: string;
    regDate: Date;
    startDate: Date;
    endDate?: Date;
}
