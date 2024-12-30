import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    return await this.prismaService.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prismaService.track.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.track.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.prismaService.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async remove(id: string) {
    await this.prismaService.track.delete({ where: { id } });
  }
}
