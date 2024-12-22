import { IsDefined, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsDefined({ message: 'Old password should not be null or undefined' })
  oldPassword: string;

  @Length(4, 56, {
    message: 'Password must be string and length in range 4 and 56',
  })
  newPassword: string;
}
