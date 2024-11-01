import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaService';
import { Todo, User, UsersOnTodos } from '@prisma/client';

@Injectable()
export class UsersOnTodosService {
  constructor(private readonly prisma: PrismaService) {}

  async addUser(id: number, user: User): Promise<UsersOnTodos | null> {
    return this.prisma.usersOnTodos.create({
      data: {
        userId: user.id,
        todoId: id,
      },
    });
  }

  async removeUser(id: number) {
    return this.prisma.usersOnTodos.delete({
      where: {
        id,
      },
    });
  }

  async updateManyUsers(id: number, users: User[]) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.usersOnTodos.deleteMany({
        where: {
          todoId: id,
        },
      });

      await prisma.usersOnTodos.createMany({
        data: users.map((user: User) => ({
          userId: user.id,
          todoId: id,
        })),
      });
    });
  }
}
