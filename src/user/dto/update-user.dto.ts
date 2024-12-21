import { IsDefined, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsDefined({ message: 'Old password should not be null or undefined' })
  oldPassword: string;

  @Length(8, 56, {
    message: 'New password must be string and in range 8 and 56 characters',
  })
  newPassword: string;
}
