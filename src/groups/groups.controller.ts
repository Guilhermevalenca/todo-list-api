import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Request,
  UsePipes,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group, UsersOnGroups } from '@prisma/client';
import { UsersOnGroupsService } from '../users-on-groups/users-on-groups.service';
import { ZodValidationPipe } from '@zodValidation';
import createGroupValidation from '@src/groups/validation-schema/createGroupValidation';
import { AuthGuard } from '@authGuard';
import { GroupsGuard } from '@src/groups/groups.guard';
import removeUserGroupValidation from '@src/groups/validation-schema/removeUserGroupValidation';
import addUserGroupValidation from '@src/groups/validation-schema/addUserGroupValidation';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly usersOnGroupsService: UsersOnGroupsService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createGroupValidation))
  async store(@Body() groupData: Group, @Request() req): Promise<Group | null> {
    return this.groupsService.create({
      ...groupData,
      users: {
        create: [
          {
            userId: req.user.id,
            role: 'ADMIN',
          },
        ],
      },
    });
  }

  @Post('user')
  @HttpCode(201)
  @UseGuards(AuthGuard, GroupsGuard)
  @UsePipes(new ZodValidationPipe(addUserGroupValidation))
  async addUser(
    @Body() data: { groupId: number; email: string },
  ): Promise<UsersOnGroups | null> {
    return this.usersOnGroupsService.addUser(data.groupId, data.email);
  }

  @Delete('user')
  @HttpCode(200)
  @UseGuards(AuthGuard, GroupsGuard)
  @UsePipes(new ZodValidationPipe(removeUserGroupValidation))
  async removeUser(
    @Body() data: { groupId: number; userId: number },
  ): Promise<UsersOnGroups | null> {
    return this.usersOnGroupsService.removeUser(data.groupId, data.userId);
  }

  @Put('role')
  @HttpCode(200)
  @UseGuards(AuthGuard, GroupsGuard)
  async updateRoleUser(
    @Body() data: UsersOnGroups,
  ): Promise<UsersOnGroups | null> {
    return this.usersOnGroupsService.updateRole(data);
  }
}
