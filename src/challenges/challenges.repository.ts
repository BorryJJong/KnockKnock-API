import {Injectable, UnauthorizedException} from '@nestjs/common';
import {EntityRepository, getManager, Repository} from 'typeorm';
import {Challenges} from 'src/entities/Challenges';
import {BlogPost} from 'src/entities/BlogPost';
import {
  GetChallengeListResponseDTO,
  ParticipantUserDTO,
} from './dto/challenges.dto';
import {User} from 'src/entities/User';
import {BlogChallenges} from '../entities/BlogChallenges';

@Injectable()
@EntityRepository(Challenges)
export class ChallengesRepository extends Repository<Challenges> {
  public async checkExistChallenge({id}) {
    const challenge = await this.findOne({select: ['id'], where: {id}});
    if (challenge) {
      throw new UnauthorizedException('이미 존재하는 챌린지입니다.');
    }
  }

  public async findChallengeById(id: number): Promise<Challenges> {
    const challenge = await this.findOne({
      select: ['id', 'title', 'subTitle', 'content', 'regDate'],
      where: {id},
    });
    if (!challenge) {
      throw new UnauthorizedException('존재하지 않는 챌린지입니다.');
    }
    return challenge;
  }

  public async findChallengeAll(): Promise<Challenges[]> {
    const challenges = await this.find({
      select: ['id', 'title', 'subTitle', 'content', 'regDate'],
    });
    return challenges;
  }

  public async getChallengeList(): Promise<GetChallengeListResponseDTO[]> {
    const userPostChallenge: any = getManager()
      .createQueryBuilder()
      .select('bp.user_id', 'user_id')
      .addSelect('bc.challenge_id', 'challenge_id')
      .from(BlogPost, 'bp')
      .innerJoin(BlogChallenges, 'bc', 'bp.id = bc.post_id')
      .groupBy('bp.user_id, bc.challenge_id');

    const challengePostCnt: any = getManager()
      .createQueryBuilder()
      .select('a.id', 'id')
      .addSelect('count(*)', 'post_cnt')
      .from(Challenges, 'a')
      .innerJoin(
        '(' + userPostChallenge.getQuery() + ')',
        'b',
        'a.id = b.challenge_id',
      )
      .groupBy('a.id');

    const challengeList: any = getManager()
      .createQueryBuilder()
      .select('ma.id', 'id')
      .addSelect('ma.title', 'title')
      .addSelect('ma.content', 'content')
      .addSelect('ma.sub_title', 'subTitle')
      .addSelect('ma.reg_date', 'regDate')
      .addSelect(
        "case when date_format(ma.reg_date,'%Y%m%d') between date_format(timestampadd(month, -1, sysdate()),'%Y%m%d') and date_format(sysdate(),'%Y%m%d') then 'Y' else 'N' end",
        'newYn',
      )
      .addSelect('IFNULL(mb.post_cnt,0)', 'postCnt')
      .addSelect('rank() over(order by mb.post_cnt desc)', 'rnk')
      .from(Challenges, 'ma')
      .leftJoin('(' + challengePostCnt.getQuery() + ')', 'mb', 'ma.id = mb.id');

    // Execute the generated query
    const challengeListRaws = await challengeList.getRawMany();

    //Convert raws to our appropriate objects
    const challenges = challengeListRaws.map((s: any) => {
      console.log(s);
      const item: GetChallengeListResponseDTO = {
        id: s.id,
        title: s.title,
        subTitle: s.subTitle,
        content: s.content,
        regDate: s.regDate,
        newYn: s.newYn,
        postCnt: s.postCnt,
        rnk: s.rnk,
        participants: null,
      };
      return item;
    });

    return challenges;
  }

  public async getParticipantList(
    challengeId: number,
  ): Promise<ParticipantUserDTO[]> {
    console.log('ChallengeId : ' + challengeId);

    const userPostChallenge: any = getManager()
      .createQueryBuilder()
      .select('bp.user_id', 'user_id')
      .addSelect('bc.challenge_id', 'challenge_id')
      .from(BlogPost, 'bp')
      .innerJoin(BlogChallenges, 'bc', 'bp.id = bc.post_id')
      .where("bc.challenge_id = ':id'", {id: challengeId})
      .groupBy('bp.user_id, bc.challenge_id');

    const challengePostCnt: any = getManager()
      .createQueryBuilder()
      .select('a.id', 'id')
      .addSelect('min(reg_date)', 'reg_date')
      .from(Challenges, 'a')
      .innerJoin(
        '(' + userPostChallenge.getQuery() + ')',
        'b',
        'a.id = b.challenge_id',
      )
      .groupBy('a.id');

    const participantList: any = getManager()
      .createQueryBuilder()
      .select('ma.id', 'id')
      .addSelect('ma.nickname', 'nickname')
      .addSelect('ma.image', 'image')
      .from(User, 'ma')
      .leftJoin('(' + challengePostCnt.getQuery() + ')', 'mb', 'ma.id = mb.id')
      .orderBy('mb.reg_date', 'ASC');

    const participantListRaws = await participantList.getRawMany();

    //Convert raws to our appropriate objects
    const participants = participantListRaws.map((s: any) => {
      console.log(s);
      const item: ParticipantUserDTO = {
        id: s.id,
        nickname: s.nickname,
        image: s.image,
      };
      return item;
    });

    return participants;
  }
}
