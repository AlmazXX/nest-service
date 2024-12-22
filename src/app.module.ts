import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import config from './config/config';
import { FavModule } from './fav/fav.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    PrismaModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    FavModule,
    TrackModule,
  ],
})
export class AppModule {}
