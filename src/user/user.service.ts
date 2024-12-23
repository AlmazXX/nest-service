import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const doesExist = await this.prismaService.user.findUnique({
      where: { login: createUserDto.login },
    });

    if (doesExist) {
      throw new BadRequestException('User with such login already exists');
    }

    const user = await this.prismaService.user.create({
      data: createUserDto,
    });

    return new User(user);
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => new User(user));
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    return new User(user);
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    if (!oldPassword || user.password !== oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: { password: newPassword, version: { increment: 1 } },
    });

    return new User(updatedUser);
  }

  async remove(id: string) {
    await this.prismaService.user.delete({ where: { id } });
  }

  async findByLogin(login: string) {
    return await this.prismaService.user.findFirst({
      where: { login },
    });
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
