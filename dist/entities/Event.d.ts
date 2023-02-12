import { IEvent } from 'src/api/home/interface/event.interface';
export declare class Event implements IEvent {
    id: number;
    title: string;
    image: string;
    url: string;
    regDate: Date;
    startDate: Date;
    endDate?: Date;
}
