import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavModule } from './fav/fav.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    FavModule,
  ],
})
export class AppModule {}
