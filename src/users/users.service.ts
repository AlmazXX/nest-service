import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany();

      return users.map((user) => new User(user));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { id },
      });

      return new User(user);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User with such an id does not exist');
      }

      if (error.code === 'P2023') {
        throw new BadRequestException(error.meta.message);
      }

      throw error;
    }
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    try {
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
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User with such an id does not exist');
      }

      if (error.code === 'P2023') {
        throw new BadRequestException(error.meta.message);
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User with such an id does not exist');
      }

      if (error.code === 'P2023') {
        throw new BadRequestException(error.meta.message);
      }

      throw error;
    }
  }
}
