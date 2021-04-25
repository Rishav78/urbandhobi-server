import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger('URBANDHOBI API');
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const { response } = exception as any;
    this.logger.error(exception);

    res.status(404).json({
      message: (response && response.error) || '',
      httpCode: 404,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
