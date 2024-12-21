import { Transform } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class Fave {
  @Transform(({ value }) => value.map((v) => v.artist))
  artist: Prisma.FaveArtistGetPayload<{ include: { artist: true } }>[];

  @Transform(({ value }) => value.map((v) => v.album))
  album: Prisma.FaveAlbumGetPayload<{ include: { album: true } }>[];

  constructor(faves: Fave) {
    Object.assign(this, faves);
  }
}
