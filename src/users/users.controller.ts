import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async store(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<User> {
    return this.usersService.create(userData);
  }
}
