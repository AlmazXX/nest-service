import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LocalPayload } from './strategies/local-payload.type';
import { User } from 'src/user/entities/user.entity';

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

  async login(user: LocalPayload) {
    return { accessToken: this.jwtService.sign(user) };
  }

  async validateUser(login: string, password: string): Promise<LocalPayload> {
    const user = await this.userService.findByLogin(login);

    if (!user) return null;

    const isMatched = await bcryptCompare(password, user.password);

    if (!isMatched) return null;

    return { login: user.login, userId: user.id };
  }

  private async hash(password: string) {
    return bcryptHash(password, this.configService.get('hashSalt'));
  }
}
