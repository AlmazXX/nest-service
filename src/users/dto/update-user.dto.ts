import { Length } from 'class-validator';

export class UpdatePasswordDto {
  oldPassword: string;
  @Length(8, 56, { message: 'New password must be in range 8 and 56' })
  newPassword: string;
}
