import {Injectable} from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm';
import {
  INotice,
  INoticeRepository,
} from 'src/api/my-page/interface/notice.Interface';
import {Notice} from '@entities/Notice';

@Injectable()
@EntityRepository(Notice)
export class NoticeRepository
  extends Repository<Notice>
  implements INoticeRepository
{
  async selectNotices(): Promise<INotice[]> {
    return await this.createQueryBuilder('notice')
      .where('notice.exposeDate IS NOT NULL')
      .orderBy('notice.modDate', 'DESC')
      .getMany();
  }

  async selectNoticeOrFail(id: number): Promise<INotice> {
    return await this.createQueryBuilder('notice')
      .where('notice.id = :id', {
        id,
      })
      .getOneOrFail();
  }
}
