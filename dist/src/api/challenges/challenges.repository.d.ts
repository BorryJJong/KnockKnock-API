import { Repository } from 'typeorm';
import { GetChallengeListResponseDTO, ParticipantUserDTO } from './dto/challenges.dto';
import { Challenges } from '../../entities/Challenges';
import { IChallengeTitle } from './challenges.interface';
export declare class ChallengesRepository extends Repository<Challenges> {
    checkExistChallenge({ id }: {
        id: any;
    }): Promise<void>;
    findChallengeById(id: number): Promise<Challenges>;
    findChallengeAll(): Promise<Challenges[]>;
    getChallengeList(): Promise<GetChallengeListResponseDTO[]>;
    getParticipantList(challengeId: number): Promise<ParticipantUserDTO[]>;
    getChallengeTitles(): Promise<IChallengeTitle[]>;
}
