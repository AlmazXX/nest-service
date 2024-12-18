import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class ArtistsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    try {
      const artist = await this.prismaService.artist.create({
        data: createArtistDto,
      });

      return artist;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(
          error.message.split('\n').at(-1).replace(/\n/g, ''),
        );
      }

      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.artist.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const artist = await this.prismaService.artist.findUniqueOrThrow({
        where: { id },
      });

      return artist;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Artist with such an id does not exist');
      }

      if (error.code === 'P2023') {
        throw new BadRequestException(error.meta.message);
      }

      throw error;
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const artist = await this.prismaService.artist.update({
        where: { id },
        data: updateArtistDto,
      });

      return artist;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Artist with such an id does not exist');
      }

      if (error.code === 'P2023') {
        throw new BadRequestException(error.meta.message);
      }

      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.artist.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Artist with such an id does not exist');
      }

      if (error.code === 'P2023') {
        throw new BadRequestException(error.meta.message);
      }

      throw error;
    }
  }
}
