import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class JwtOptionalGuard extends AuthGuard('jwt-access-token') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(_, user) {
    // 비회원 호출의 경우 return user:false
    // 토큰은 있지만, 잘못된 토큰이 넘어올 경우 return user:false
    // 회원의 호출의 경우 return user
    return user;
  }
}
