import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengesRepository } from './challenges.repository';
import { GetChallengeListResponseDTO, GetChallengeRequestDTO, GetChallengeResponseDTO } from './dto/challenges.dto';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectRepository(ChallengesRepository)
        private readonly challengesRepository: ChallengesRepository,
      ) {}
    
    async getChallenge({ id }: GetChallengeRequestDTO): Promise<GetChallengeResponseDTO> {
        const challenge = await this.challengesRepository.findChallengeById(id);
        const { title,subTitle,content,regDate } = challenge;
        return {
            id,
            title,
            subTitle,
            content,
            regDate
        };
    }

    async getAllChallenges(): Promise<GetChallengeResponseDTO[]> {
        const challenges = await this.challengesRepository.findChallengeAll();
        return challenges;
    }

    async getChallengeList(): Promise<GetChallengeListResponseDTO[]> {
        const challengeList = await this.challengesRepository.getChallengeList();
        return challengeList;
    }
    
}
