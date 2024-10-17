import { Args, Query, Resolver } from '@nestjs/graphql';
import { GroupsService } from './groups.service';

@Resolver('Groups')
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query()
  async group(@Args('id') id: number) {
    return this.groupsService.find(id);
  }

  @Query()
  async groups() {
    return this.groupsService.all();
  }
}
