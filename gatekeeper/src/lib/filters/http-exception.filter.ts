import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = (exception.getStatus && exception.getStatus()) || 500;
    const { message: error, response, stack } = exception as any;

    res.status(200).json({
      message: (response && response.error) || '',
      httpCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      stack,
    });
  }
}
