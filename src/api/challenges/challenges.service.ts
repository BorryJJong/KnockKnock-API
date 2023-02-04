import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {isAfter, subDays} from 'date-fns';
import {IGetListChallengeRes} from 'src/api/challenges/challenges.interface';
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

  async getChallenge({id}: GetChallengeReqDTO): Promise<GetChallengeResDTO> {
    const challenge = await this.challengesRepository.findChallengeById(id);
    const {title, subTitle, content, regDate} = challenge;
    return {
      id,
      title,
      subTitle,
      content,
      regDate,
    };
  }

  async getAllChallenges(): Promise<GetChallengeResDTO[]> {
    const challenges = await this.challengesRepository.findChallengeAll();
    return challenges;
  }

  async getChallengeDetail({
    id,
  }: GetChallengeReqDTO): Promise<GetChallengeDetailResDTO> {
    const challengeDTO = await this.challengesRepository.findChallengeById(id);
    const participantList = await this.challengesRepository.getParticipantList(
      id,
    );

    const challengeContentJson: ChallengeContentType = JSON.parse(
      challengeDTO.content,
    ) as ChallengeContentType;
    const subContents: ChallengeSubContentDTO[] = [];

    if (challengeContentJson.subContents !== undefined) {
      challengeContentJson.subContents.forEach((_, index) => {
        const subContent = challengeContentJson.subContents[index];

        subContents[index] = new ChallengeSubContentDTO(
          subContent.title,
          subContent.image,
          subContent.content,
        );
      });
    }

    const challengeContent = new ChallengeContentDTO(
      challengeContentJson.image,
      challengeContentJson.title,
      challengeContentJson.subTitle,
      challengeContentJson.rule,
      subContents,
    );

    const challenge = new GetChallengeDetailResDTO(
      challengeDTO,
      participantList,
      challengeContent,
    );
    return challenge;
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
