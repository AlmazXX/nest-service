import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

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
      let statusCode = StatusCodes.BAD_REQUEST;

      switch (exception.code) {
        case 'P2002':
          statusCode = StatusCodes.NOT_FOUND;
          message =
            <string>exception.meta.message ||
            `Unique constraint failed on the {constraint}`;
          break;
        case 'P2003':
          statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
          message =
            <string>exception.meta.message ||
            `Foreign key constraint failed on the field: ${exception.meta.field_name}`;
          break;
        case 'P2025':
          statusCode = StatusCodes.NOT_FOUND;
          message = `${exception.meta.modelName} is not found`;
          break;
        default:
          break;
      }

      response.status(statusCode).json({ statusCode, message });
    }

    if (exception instanceof PrismaClientValidationError) {
      const statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

      response.status(statusCode).json({ statusCode, message });
    }
  }
}
