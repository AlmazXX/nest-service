import { Artist } from '@prisma/client';
import { Length } from 'class-validator';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @Length(1, undefined, { message: 'Please provide an artist name' })
  name: string;
  grammy: boolean;
}
