import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {isAfter, subDays} from 'date-fns';
import {
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
  GetListChallengeResDTOV2,
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
      participantList,
      new ChallengeContentDTO(
        this.makeChallgenImageUrl(challengeContent.image),
        challengeContent.rule,
        subContents,
      ),
    );
  }

  async getChallengeList(
    query: GetChallengeListReqQueryDTO,
  ): Promise<GetListChallengeResDTOV2[]> {
    const {sort} = query;
    const challenges: IGetListChallengeRes[] =
      await this.challengesRepository.getChallengeList(sort);

    for (let index = 0; index < challenges.length; index++) {
      const challengeId = challenges[index].id;

      const participantList =
        await this.challengesRepository.getParticipantList(challengeId);
      challenges[index].participants = participantList;
    }

    return challenges.map(challenge => {
      return new GetListChallengeResDTOV2(
        challenge.id,
        challenge.title,
        challenge.subTitle,
        this.makeChallgenImageUrl(challenge.mainImage),
        challenge.rnk < 3,
        isAfter(challenge.regDate, subDays(new Date(), 7)),
        challenge.participants.length + 1,
        challenge.participants,
      );
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
