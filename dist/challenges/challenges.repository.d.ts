import { Repository } from 'typeorm';
import { Challenges } from 'src/entities/Challenges';
import { GetChallengeListResponseDTO, ParticipantUserDTO } from './dto/challenges.dto';
export declare class ChallengesRepository extends Repository<Challenges> {
    checkExistChallenge({ id }: {
        id: any;
    }): Promise<void>;
    findChallengeById(id: number): Promise<Challenges>;
    findChallengeAll(): Promise<Challenges[]>;
    getChallengeList(): Promise<GetChallengeListResponseDTO[]>;
    getParticipantList(challengeId: number): Promise<ParticipantUserDTO[]>;
}
