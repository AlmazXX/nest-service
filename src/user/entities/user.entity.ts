import { User as UserModel } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class User implements UserModel {
  id: string;
  login: string;
  version: number;
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date;
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: Date;
  @Exclude()
  password: string;
  @Exclude()
  refreshToken: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
