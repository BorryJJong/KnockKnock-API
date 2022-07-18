import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ChallengesRepository} from './challenges.repository';
import {
  GetListChallengeResDTO,
  GetChallengeReqDTO,
  GetChallengeResDTO,
  GetChallengeTitleReqDTO,
  GetChallengeDetailResDTO,
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
