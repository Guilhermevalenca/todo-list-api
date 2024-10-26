import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaService';
import { UsersOnGroups, Prisma } from '@prisma/client';

@Injectable()
export class UsersOnGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async updateRole(data: UsersOnGroups): Promise<UsersOnGroups | null> {
    return this.prisma.usersOnGroups.update({
      where: {
        userId_groupId: {
          groupId: data.groupId,
          userId: data.userId,
        },
      },
      data: {
        role: data.role,
      },
    });
  }

  async addUser(groupId: number, email: string) {
    return this.prisma.usersOnGroups.create({
      data: {
        group: {
          connect: {
            id: groupId,
          },
        },
        user: {
          connect: {
            email,
          },
        },
      },
    });
  }

  async removeUser(groupId: number, userId: number) {
    return this.prisma.usersOnGroups.delete({
      where: {
        userId_groupId: {
          groupId,
          userId,
        },
      },
    });
  }
}
