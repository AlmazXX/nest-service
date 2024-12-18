import { Artist } from '@prisma/client';
import { IsBoolean, IsOptional, Length } from 'class-validator';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @Length(1, undefined, { message: 'Please provide an artist name' })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'Grammy should be of type boolean' })
  grammy: boolean;
}
