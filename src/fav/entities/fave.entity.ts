import { Transform } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class Fave {
  @Transform(({ value }) => value.map((v) => v.artist))
  artists: Prisma.FaveArtistGetPayload<{ include: { artist: true } }>[];

  @Transform(({ value }) => value.map((v) => v.album))
  albums: Prisma.FaveAlbumGetPayload<{ include: { album: true } }>[];

  @Transform(({ value }) => value.map((v) => v.track))
  tracks: Prisma.FaveTrackGetPayload<{ include: { track: true } }>[];

  constructor(faves: Fave) {
    Object.assign(this, faves);
  }
}
