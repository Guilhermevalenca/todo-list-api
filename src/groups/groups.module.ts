import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupsResolver } from './groups.resolver';
import { PrismaService } from '@prismaService';
import { UsersOnGroupsService } from '../users-on-groups/users-on-groups.service';

@Module({
  controllers: [GroupsController],
  providers: [
    GroupsService,
    GroupsResolver,
    PrismaService,
    UsersOnGroupsService,
  ],
})
export class GroupsModule {}
