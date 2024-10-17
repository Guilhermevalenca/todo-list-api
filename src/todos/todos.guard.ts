import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@prismaService';

@Injectable()
export class AddUserTodosGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user && request.user.id === undefined) {
      throw new UnauthorizedException();
    }

    const prisma = new PrismaService();
    const data = await prisma.todo.findUnique({
      where: {
        id: Number(request.params.id),
      },
      select: {
        group: {
          include: {
            users: {
              where: {
                userId: Number(request.user.id),
              },
              select: {
                role: true,
              },
            },
          },
        },
      },
    });

    const role = data?.group?.users[0]?.role;

    return !!role && role === 'ADMIN';
  }
}

@Injectable()
export class RemoveUserTodosGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user && request.user.id === undefined) {
      throw new UnauthorizedException();
    }

    const prisma = new PrismaService();
    const data = await prisma.usersOnTodos.findUnique({
      where: {
        id: Number(request.params.id),
      },
      include: {
        todo: {
          include: {
            group: {
              include: {
                users: {
                  where: {
                    userId: Number(request.user.id),
                  },
                  select: {
                    role: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const role = data?.todo?.group?.users[0]?.role;

    return !!role && role === 'ADMIN';
  }
}
