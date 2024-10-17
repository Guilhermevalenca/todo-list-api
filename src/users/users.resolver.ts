import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@authGuard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  @UseGuards(AuthGuard)
  async user(@Request() req) {
    return this.usersService.find(req.user.id);
  }
}
