import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { refreshJwtConfig } from './config/refresh-jwt.config';
import { LocalPayload } from './types/local-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}
  async signup(createUserDto: CreateUserDto) {
    const doesExist = await this.userService.findByLogin(createUserDto.login);

    if (doesExist)
      throw new BadRequestException('User with such login already exists');

    const password = await this.hash(createUserDto.password);

    const user = await this.userService.create({ ...createUserDto, password });

    return new User(user);
  }

  async login(payload: LocalPayload) {
    const { accessToken, refreshToken } = await this.generateToken(payload);
    const hashedRefershToken = await this.hash(refreshToken);
    await this.userService.updateRefreshToken(
      payload.userId,
      hashedRefershToken,
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(payload: LocalPayload) {
    const { accessToken, refreshToken } = await this.generateToken(payload);
    const hashedRefershToken = await this.hash(refreshToken);
    await this.userService.updateRefreshToken(
      payload.userId,
      hashedRefershToken,
    );

    return { accessToken, refreshToken };
  }

  async generateToken(payload: LocalPayload) {
    const { 0: accessToken, 1: refreshToken } = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return { accessToken, refreshToken };
  }

  async validateUser(login: string, password: string): Promise<LocalPayload> {
    const user = await this.userService.findByLogin(login);

    if (!user) throw new ForbiddenException('Incorrect login or password');

    const isMatched = await bcryptCompare(password, user.password);

    if (!isMatched) throw new ForbiddenException('Incorrect login or password');

    return { login: user.login, userId: user.id };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);

    if (!user.refreshToken)
      throw new ForbiddenException('Invalid refresh token');

    const isMatched = await bcryptCompare(refreshToken, user.refreshToken);

    if (!isMatched) throw new ForbiddenException('Invalid refresh token');

    return { login: user.login, userId: user.id };
  }

  private async hash(password: string) {
    return bcryptHash(password, this.configService.get('hashSalt'));
  }
}
