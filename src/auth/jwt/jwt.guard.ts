import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt-access-token') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const {authorization} = request.headers;

    if (!authorization) {
      throw new HttpException(
        {
          error: 'AccessToken 미전송',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return super.canActivate(context);
  }
}
