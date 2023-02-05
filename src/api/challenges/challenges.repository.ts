import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {EntityRepository, getManager, Repository} from 'typeorm';
import {ParticipantUserDTO} from './dto/challenges.dto';
import {BlogChallenges} from '../../entities/BlogChallenges';
import {Challenges} from '../../entities/Challenges';
import {User} from '../../entities/User';
import {BlogPost} from '../../entities/BlogPost';
import {
  IChallengeTitle,
  IGetChallengeDetailRes,
  IGetListChallengeRes,
} from './challenges.interface';
import {map} from 'ramda';
import {CHALLENGES_SORT} from '@shared/enums/enum';

@Injectable()
@EntityRepository(Challenges)
export class ChallengesRepository extends Repository<Challenges> {
  public async checkExistChallenge({id}) {
    const challenge = await this.findOne({select: ['id'], where: {id}});
    if (challenge) {
      throw new HttpException(
        {
          error: '이미 존재하는 챌린지입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async findChallengeById(id: number): Promise<IGetChallengeDetailRes> {
    const challenge = await this.findOne({
      select: ['id', 'title', 'subTitle', 'content', 'contentImage'],
      where: {id},
    });

    if (!challenge) {
      throw new HttpException(
        {
          error: '존재하지 않는 챌린지입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return challenge;
  }

  public async findChallengeAll(): Promise<Challenges[]> {
    const challenges = await this.find({
      select: ['id', 'title', 'subTitle', 'content', 'regDate'],
    });
    return challenges;
  }

  public async getChallengeList(
    sort: CHALLENGES_SORT,
  ): Promise<IGetListChallengeRes[]> {
    const userPostChallenge = getManager()
      .createQueryBuilder()
      .select('bp.user_id', 'user_id')
      .addSelect('bc.challenge_id', 'challenge_id')
      .from(BlogPost, 'bp')
      .innerJoin(BlogChallenges, 'bc', 'bp.id = bc.post_id')
      .groupBy('bp.user_id, bc.challenge_id');

    const challengePostCnt = getManager()
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

    const challengeList = getManager()
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
      .addSelect('ma.main_image', 'mainImage')
      .from(Challenges, 'ma')
      .leftJoin('(' + challengePostCnt.getQuery() + ')', 'mb', 'ma.id = mb.id');

    if (sort === CHALLENGES_SORT.BRAND_NEW) {
      challengeList.orderBy('ma.regDate', 'DESC');
    } else {
      challengeList.orderBy('rnk', 'ASC');
    }

    return await challengeList.getRawMany<IGetListChallengeRes>();
  }

  public async getParticipantList(
    challengeId: number,
  ): Promise<ParticipantUserDTO[]> {
    const userPostChallengeQuery = getManager()
      .createQueryBuilder()
      .select('bp.user_id', 'user_id')
      .addSelect('bc.challenge_id', 'challenge_id')
      .from(BlogPost, 'bp')
      .innerJoin(BlogChallenges, 'bc', 'bp.id = bc.post_id')
      .where("bc.challenge_id = ':id'", {id: challengeId})
      .andWhere('bp.del_date IS NULL')
      .groupBy('bp.user_id, bc.challenge_id');

    const challengePostCntQuery = getManager()
      .createQueryBuilder()
      .select('challenge.id', 'id')
      .addSelect('min(reg_date)', 'reg_date')
      .from(Challenges, 'challenge')
      .innerJoin(
        '(' + userPostChallengeQuery.getQuery() + ')',
        'userPostChallenge',
        'challenge.id = userPostChallenge.challenge_id',
      )
      .groupBy('challenge.id');

    const participantsQuery = getManager()
      .createQueryBuilder()
      .select('user.id', 'id')
      .addSelect('user.image', 'image')
      .from(User, 'user')
      .leftJoin(
        '(' + challengePostCntQuery.getQuery() + ')',
        'cp',
        'user.id = cp.id',
      )
      .where('user.deletedAt IS NULL')
      .orderBy('RAND()')
      .limit(3);

    const participants: ParticipantUserDTO[] =
      await participantsQuery.getRawMany();

    return participants.map(
      (participant: ParticipantUserDTO) =>
        new ParticipantUserDTO(participant.id, participant.image),
    );
  }

  public async getChallengeTitles(): Promise<IChallengeTitle[]> {
    return await this.manager
      .find(Challenges, {
        select: ['id', 'title'],
      })
      .then(
        map(challenge => {
          return {
            id: challenge.id,
            title: challenge.title,
          };
        }),
      );
  }
}
