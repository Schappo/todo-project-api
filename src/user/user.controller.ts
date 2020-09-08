import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../interfaces';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.service.getUsers();
  }

  @Post()
  async createUser(@Body() body: User): Promise<User> {
    console.log(body)
    return await this.service.create(body);
  }
}
