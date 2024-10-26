import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaService';
import { Todo, Prisma, User } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<Todo[] | null> {
    return this.prisma.todo.findMany({
      include: {
        group: true,
        users: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async find(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: {
        id,
      },
      include: {
        group: true,
        users: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async create(data: Todo, users: User[]): Promise<Todo | null> {
    return this.prisma.todo.create({
      data: {
        ...data,
        users: {
          createMany: {
            data: users.map((user: User) => ({ userId: user.id })),
          },
        },
      },
    });
  }

  async update(id: number, data: Prisma.TodoUpdateInput): Promise<Todo | null> {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Todo | null> {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}
