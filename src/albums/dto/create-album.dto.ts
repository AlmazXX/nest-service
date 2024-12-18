import { Album } from '@prisma/client';
import { IsOptional, Length } from 'class-validator';
import { IsYear } from 'src/common/decorators/is-year.decorator';

export class CreateAlbumDto implements Omit<Album, 'id'> {
  @Length(1, undefined, { message: 'Please provide an album name' })
  name: string;
  @IsYear({ min: 1700, max: 2100 })
  year: number;
  @IsOptional()
  artistId: string | null;
}
