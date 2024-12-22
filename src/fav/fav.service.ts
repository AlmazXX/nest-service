import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Fave } from './entities/fave.entity';

@Injectable()
export class FavService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const { 0: artist, 1: album } = await Promise.all([
      this.prismaService.faveArtist.findMany({ include: { artist: true } }),
      this.prismaService.faveAlbum.findMany({ include: { album: true } }),
    ]);

    return new Fave({ artist, album });
  }

  async createFaveArtist(id: string) {
    return await this.prismaService.faveArtist.create({
      data: { artistId: id },
    });
  }

  async deleteFaveArtist(id: string) {
    return await this.prismaService.faveArtist.delete({
      where: { artistId: id },
    });
  }

  async createFaveAlbum(id: string) {
    return await this.prismaService.faveAlbum.create({
      data: { albumId: id },
    });
  }

  async deleteFaveAlbum(id: string) {
    return await this.prismaService.faveAlbum.delete({
      where: { albumId: id },
    });
  }

  async createFaveTrack(id: string) {
    return await this.prismaService.faveTrack.create({
      data: { trackId: id },
    });
  }

  async deleteFaveTrack(id: string) {
    return await this.prismaService.faveTrack.delete({
      where: { trackId: id },
    });
  }
}
