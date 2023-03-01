import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {dateFormat} from '@shared/utils';
import {
  GetListNoticeResDTO,
  GetNoticeResDTO,
} from 'src/api/my-page/dto/notice.dto';
import {NoticeRepository} from 'src/api/my-page/repository/notice.repository';
import {UserRepository} from 'src/api/users/users.repository';

@Injectable()
export class MyPageService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(NoticeRepository)
    private readonly noticeRepository: NoticeRepository,
  ) {}

  async isLogin(userId: number): Promise<boolean> {
    const user = await this.userRepository.selectUser(userId);

    // 로그아웃 여부
    return user && user.refreshToken ? true : false;
  }

  async getListNotice(): Promise<GetListNoticeResDTO[]> {
    const notices = await this.noticeRepository.selectNotices();

    return notices.map(notice => {
      return new GetListNoticeResDTO(
        notice.id,
        notice.title,
        dateFormat(notice.modDate),
      );
    });
  }

  async getNotice(id: number): Promise<GetNoticeResDTO> {
    const notice = await this.noticeRepository.selectNoticeOrFail(id);

    return new GetNoticeResDTO(notice.id, notice.title, notice.link);
  }
}
