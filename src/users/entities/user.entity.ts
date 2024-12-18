import { User as UserModel } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User implements UserModel {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  @Exclude()
  password: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
