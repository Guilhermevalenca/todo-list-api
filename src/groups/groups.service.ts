import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaService';
import { Group, Prisma } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<Group[]> {
    return this.prisma.group.findMany({
      include: {
        users: {
          include: {
            user: true,
          },
        },
        todos: true,
      },
    });
  }

  async create(data: Prisma.GroupCreateInput): Promise<Group | null> {
    return this.prisma.group.create({
      data,
    });
  }

  async find(id: number): Promise<Group | null> {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        todos: true,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.GroupUpdateInput,
  ): Promise<Group | null> {
    return this.prisma.group.update({
      where: {
        id,
      },
      data,
    });
  }
}
