import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  login: string;

  @Length(8, 56, { message: 'Password must be in range 8 and 56' })
  password: string;
}
