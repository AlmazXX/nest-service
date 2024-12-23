import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './types/jwt-payload.type';
import { LocalPayload } from './types/local-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async signup(createUserDto: CreateUserDto) {
    const doesExist = await this.userService.findByLogin(createUserDto.login);

    if (doesExist)
      throw new BadRequestException('User with such login already exists');

    const password = await this.hash(createUserDto.password);

    const user = await this.userService.create({ ...createUserDto, password });

    return new User(user);
  }

  async login({ login, userId }: LocalPayload) {
    const payload: JwtPayload = { login, sub: userId };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async validateUser(login: string, password: string): Promise<LocalPayload> {
    const user = await this.userService.findByLogin(login);

    if (!user) throw new ForbiddenException('Incorrect login or password');

    const isMatched = await bcryptCompare(password, user.password);

    if (!isMatched) throw new ForbiddenException('Incorrect login or password');

    return { login: user.login, userId: user.id };
  }

  private async hash(password: string) {
    return bcryptHash(password, this.configService.get('hashSalt'));
  }
}
