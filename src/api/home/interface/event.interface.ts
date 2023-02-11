export interface IEventRepository {
  selectEvents(): Promise<IEvent[]>;
}

export interface IEvent {
  id: number;
  title: string;
  image: string;
  regDate: Date;
  startDate: Date;
  endDate?: Date;
}
