import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDTO, LoginResponseDTO } from 'src/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import {
  CreateUserRequestDTO,
  GetUserRequestDTO,
  GetUserResponseDTO,
} from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '성공',
  })
  async create(@Body() body: CreateUserRequestDTO) {
    await this.userService.create(body);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: '인증 에러',
  })
  async login(@Body() data: LoginRequestDTO): Promise<LoginResponseDTO> {
    return await this.authService.jwtLogin(data);
  }

  @Get(':id')
  @ApiOperation({ summary: '유저정보 조회' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetUserResponseDTO,
  })
  @UseGuards(JwtAuthGuard)
  getUser(@Param() param: GetUserRequestDTO): Promise<GetUserResponseDTO> {
    return this.userService.getUser(param);
  }
}
