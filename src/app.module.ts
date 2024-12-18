import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavesModule } from './faves/faves.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UsersModule, ArtistsModule, AlbumsModule, FavesModule],
})
export class AppModule {}
