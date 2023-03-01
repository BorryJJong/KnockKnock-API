export interface INoticeRepository {
  selectNotices(): Promise<INotice[]>;
  selectNoticeOrFail(id: number): Promise<INotice>;
}

export interface INotice {
  id: number;
  title: string;
  link: string;
  regDate: Date;
  modDate: Date;
  exposeDate: Date;
}
