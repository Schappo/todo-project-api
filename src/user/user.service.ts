import { Injectable } from '@nestjs/common';
import { User } from '../interfaces';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }
}
