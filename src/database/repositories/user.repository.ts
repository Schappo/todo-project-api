import { BaseRepository } from './base.repository';
import { UserModel } from '../../models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../../interfaces';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(UserModel) model: ReturnModelType<typeof UserModel>) {
    super(model);
  }
}