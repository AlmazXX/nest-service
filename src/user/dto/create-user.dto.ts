import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Please provide a valid email address' })
  login: string;

  @Length(4, 56, {
    message: 'Password must be string and length in range 4 and 56',
  })
  password: string;
}
