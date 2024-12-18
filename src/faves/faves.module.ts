import { Module } from '@nestjs/common';
import { FavesService } from './faves.service';
import { FavesController } from './faves.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FavesController],
  providers: [FavesService],
  imports: [PrismaModule],
})
export class FavesModule {}
