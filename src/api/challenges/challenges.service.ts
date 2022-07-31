import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ChallengesRepository} from './challenges.repository';
import {
  GetListChallengeResDTO,
  GetChallengeReqDTO,
  GetChallengeResDTO,
  GetChallengeTitleReqDTO,
  GetChallengeDetailResDTO,
  ChallengeContentDTO,
  ChallengeSubContentDTO,
} from './dto/challenges.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(ChallengesRepository)
    private readonly challengesRepository: ChallengesRepository,
  ) {}

  async getChallenge({
    id,
  }: GetChallengeReqDTO): Promise<GetChallengeResDTO> {
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
    
    const participantList = await this.challengesRepository.getParticipantList(id);
    
    let challenge = new GetChallengeDetailResDTO();
    challenge.challenge = challengeDTO;
    challenge.participants = participantList;

    let contentJson = JSON.parse(challengeDTO.content);
    let challengeContent = new ChallengeContentDTO();
    challengeContent.image = contentJson.image;
    challengeContent.title = contentJson.title;
    challengeContent.subTitle = contentJson.subTitle;
    challengeContent.rule = contentJson.rule;

    let subContents = [];
    for(var i=0;i<contentJson.contents.length;i++){
      let subContent = contentJson.contents[i];

      let challengeSubContent = new ChallengeSubContentDTO();
      challengeSubContent.title = subContent.title;
      challengeSubContent.image = subContent.image;
      challengeSubContent.content = subContent.content;

      subContents[i] = challengeSubContent;
    }
    challengeContent.subContents = subContents;

    challenge.content = challengeContent;

    return challenge;  
  }

  async getChallengeList(): Promise<GetListChallengeResDTO[]> {
    const challengeList = await this.challengesRepository.getChallengeList();

    for (let index = 0; index < (await challengeList).length; index++) {
      const element = challengeList[index];
      const challengeId = element.id;

      const participantList =
        await this.challengesRepository.getParticipantList(challengeId);
      challengeList[index].participants = participantList;
    }

    return challengeList;
  }

  async getChallengeTitles(): Promise<GetChallengeTitleReqDTO[]> {
    const challengeTitles =
      await this.challengesRepository.getChallengeTitles();
    challengeTitles.unshift({id: 0, title: '전체'});

    return challengeTitles;
  }
}
