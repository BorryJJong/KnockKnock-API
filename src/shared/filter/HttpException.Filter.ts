import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('Test Response Message', exception.getResponse());
    const res: any = exception.getResponse();

    const method: string = request.method;
    const url: string = request.url;
    const error: string = res.error;
    const now = new Date().toLocaleString();

    const errorLogFormat = `[${method}] ${url} [error|response]: ${error} [KST time] ${now}`;
    console.error('ERROR! ', errorLogFormat);

    response.status(status).json({
      success: false,
      message: res.message || 'API 서버 에러 입니다.',
    });
  }
}
