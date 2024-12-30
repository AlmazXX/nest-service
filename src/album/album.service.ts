import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prismaService.album.create({
      data: createAlbumDto,
    });
  }

  async findAll() {
    return await this.prismaService.album.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.album.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.prismaService.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(id: string) {
    await this.prismaService.album.delete({ where: { id } });
  }
}
