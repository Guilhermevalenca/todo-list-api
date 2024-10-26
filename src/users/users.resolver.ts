import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@authGuard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  @UseGuards(AuthGuard)
  async user(@Context() { req }) {
    if (!req?.user) {
      throw new Error('testing');
    }
    return this.usersService.find(req.user.id);
  }
}
