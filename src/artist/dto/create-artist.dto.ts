import { Artist } from '@prisma/client';
import { IsBoolean, Length } from 'class-validator';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @Length(1, undefined, { message: 'Please provide an artist name' })
  name: string;

  @IsBoolean({ message: 'Grammy should be of type boolean' })
  grammy: boolean;
}
