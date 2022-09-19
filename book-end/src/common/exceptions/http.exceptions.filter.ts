import { FastifyReply, FastifyRequest } from "fastify";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { BusinessException } from './business.exception'
import { HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    if (exception instanceof BusinessException) {
      const error = exception.getResponse()
      response.status(HttpStatus.OK).send({
        data: null,
        status: error['code'],
        extra: {},
        message: error['message'],
        succes: false,
      })
      return
    }
    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}
