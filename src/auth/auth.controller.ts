import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { User } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  signup(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  login(@User() user) {
    return this.authService.login(user);
  }
}
