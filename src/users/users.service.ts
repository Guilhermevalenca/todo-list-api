import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaService';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<User[] | null> {
    return this.prisma.user.findMany({
      include: {
        groups: {
          include: {
            group: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User | null> {
    return this.prisma.user.create({
      data: data,
    });
  }

  async find(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        groups: {
          include: {
            group: true,
          },
        },
      },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User | null> {
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
