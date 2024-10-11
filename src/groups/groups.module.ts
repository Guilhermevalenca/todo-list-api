import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupsResolver } from './groups.resolver';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule {}
