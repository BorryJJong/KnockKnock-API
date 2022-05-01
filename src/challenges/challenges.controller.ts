import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ChallengesService } from './challenges.service';
import { GetChallengeListResponseDTO, GetChallengeRequestDTO, GetChallengeResponseDTO } from './dto/challenges.dto';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
    constructor(
        private readonly challengesService: ChallengesService,
        //private readonly authService: AuthService,
    ) {}

    @Get('/:id')
    //@UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '챌린지 상세조회' })
    @ApiResponse({
        status: 200,
        description: '성공',
        type: GetChallengeResponseDTO,
    })
    getChallenge(@Param() param: GetChallengeRequestDTO): Promise<GetChallengeResponseDTO> {
        return this.challengesService.getChallenge(param);   
    }

    @Get('/')
    //@UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '챌린지 목록조회' })
    @ApiResponse({
        status: 200,
        description: '성공',
        type: GetChallengeResponseDTO,
    })
    getChallengeList(): Promise<GetChallengeListResponseDTO[]> {
        return this.challengesService.getChallengeList();
    }
}
