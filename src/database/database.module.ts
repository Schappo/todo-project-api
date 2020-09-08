import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from '../models';
import { UserRepository } from './repositories/user.repository';

export const Repositories = [
  UserRepository,
]

export const Models = [
  UserModel,
];

export const TypegooseModels = TypegooseModule.forFeature(Models);

@Module({
  imports: [TypegooseModels],
  providers: [...Repositories],
  exports: [...Repositories, TypegooseModels]
})
export class DatabaseModule {}