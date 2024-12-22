import { IsOptional, IsPositive, Length } from 'class-validator';

export class CreateTrackDto {
  @Length(1, undefined, { message: 'Please provide a track name' })
  name: string;
  @IsPositive({ message: 'Track duration must be positive number' })
  duration: number;
  @IsOptional()
  artistId: string | null;
  @IsOptional()
  albumId: string | null;
}
