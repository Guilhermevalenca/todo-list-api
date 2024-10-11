import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  async user(@Args('id') id: number) {
    return this.usersService.find(id);
  }
  @Query()
  async users() {
    return this.usersService.all();
  }
}
