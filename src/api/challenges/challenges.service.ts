import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {isAfter, subDays} from 'date-fns';
import {
  IChallenges,
  IGetChallengeDetailRes,
  IGetListChallengeRes,
} from 'src/api/challenges/challenges.interface';
import {ChallengesRepository} from './challenges.repository';
import {
  GetChallengeReqDTO,
  GetChallengeResDTO,
  GetChallengeTitleReqDTO,
  GetChallengeDetailResDTO,
  ChallengeContentDTO,
  ChallengeSubContentDTO,
  GetChallengeListReqQueryDTO,
  GetListChallengeInfoResDTO,
  GetChallengeListResDTO,
} from './dto/challenges.dto';

export type ChallengeSubContentJsonType = {
  title: string;
  image: string;
  content: string;
};

export type ChallengeContentType = {
  title: string;
  image: string;
  subTitle: string;
  rule: string[];
  subContents: ChallengeSubContentJsonType[];
};

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(ChallengesRepository)
    private readonly challengesRepository: ChallengesRepository,
  ) {}

  async getAllChallenges(): Promise<GetChallengeResDTO[]> {
    const challenges = await this.challengesRepository.findChallengeAll();
    return challenges;
  }

  async getChallengeDetail({
    id,
  }: GetChallengeReqDTO): Promise<GetChallengeDetailResDTO> {
    const challenge: IGetChallengeDetailRes =
      await this.challengesRepository.findChallengeById(id);
    const participantList = await this.challengesRepository.getParticipantList(
      id,
    );

    const challengeContent: ChallengeContentType = JSON.parse(
      challenge.content,
    ) as ChallengeContentType;
    const subContents: ChallengeSubContentDTO[] = [];

    if (challengeContent.subContents !== undefined) {
      challengeContent.subContents.forEach((_, index) => {
        const subContent = challengeContent.subContents[index];

        subContents[index] = new ChallengeSubContentDTO(
          subContent.title,
          this.makeChallgenImageUrl(subContent.image),
          subContent.content,
        );
      });
    }

    return new GetChallengeDetailResDTO(
      challenge.id,
      challenge.title,
      challenge.subTitle,
      this.makeChallgenImageUrl(challenge.contentImage),
      participantList.length,
      participantList,
      new ChallengeContentDTO(challengeContent.rule, subContents),
    );
  }

  async getChallengeList(
    query: GetChallengeListReqQueryDTO,
  ): Promise<GetChallengeListResDTO> {
    const {sort} = query;
    const challenges: IGetListChallengeRes[] =
      await this.challengesRepository.getChallengeList(sort);

    for (let index = 0; index < challenges.length; index++) {
      const challengeId = challenges[index].id;

      const participantList =
        await this.challengesRepository.getParticipantList(challengeId);
      challenges[index].participants = participantList;
    }

    const newChallenges = this.getNewChallenges(
      challenges as unknown as IChallenges[],
    );

    return new GetChallengeListResDTO(
      challenges.length,
      newChallenges.filter(c => c.isNewBadge).length,
      challenges.map(challenge => {
        return new GetListChallengeInfoResDTO(
          challenge.id,
          challenge.title,
          challenge.subTitle,
          this.makeChallgenImageUrl(challenge.mainImage),
          challenge.rnk < 3,
          newChallenges.find(nc => nc.challengeId === challenge.id)
            ?.isNewBadge as boolean,
          challenge.participants.length,
          challenge.participants,
        );
      }),
    );
  }

  private getNewChallenges(challenges: IChallenges[]): {
    challengeId: number;
    isNewBadge: boolean;
  }[] {
    return challenges.map(c => {
      return {
        challengeId: c.id,
        isNewBadge: isAfter(c.regDate, subDays(new Date(), 7)),
      };
    });
  }

  private makeChallgenImageUrl(imageUrl: string): string {
    return process.env.AWS_S3_ENDPOINT + `challenges/` + imageUrl;
  }

  async getChallengeTitles(): Promise<GetChallengeTitleReqDTO[]> {
    const challengeTitles =
      await this.challengesRepository.getChallengeTitles();
    challengeTitles.unshift({id: 0, title: '전체'});

    return challengeTitles;
  }
}
