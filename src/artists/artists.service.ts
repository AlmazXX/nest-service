import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    return await this.prismaService.artist.create({
      data: createArtistDto,
    });
  }

  async findAll() {
    try {
      return await this.prismaService.artist.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    return await this.prismaService.artist.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.prismaService.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    await this.prismaService.artist.delete({ where: { id } });
  }
}
