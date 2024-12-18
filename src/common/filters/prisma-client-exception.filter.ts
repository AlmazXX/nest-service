import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError, PrismaClientValidationError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(
    exception: PrismaClientKnownRequestError | PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message = exception.message.split('\n').at(-1).replace(/\n/g, '');

    if (exception instanceof PrismaClientKnownRequestError) {
      let statusCode = 400;
      message = <string>exception.meta.message;

      switch (exception.code) {
        case 'P2003':
          statusCode = 422;
          break;
        case 'P2025':
          statusCode = 404;
          message = `${exception.meta.modelName} is not found`;
          break;
        default:
          break;
      }

      response.status(statusCode).json({ statusCode, message });
    }

    if (exception instanceof PrismaClientValidationError) {
      const statusCode = 422;

      response.status(statusCode).json({ statusCode, message });
    }
  }
}
