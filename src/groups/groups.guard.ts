import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@prismaService';

@Injectable()
export class GroupsGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user && request.user.id === undefined) {
      throw new UnauthorizedException();
    }

    const prisma = new PrismaService();

    const group = await prisma.usersOnGroups.findUnique({
      where: {
        userId_groupId: {
          userId: Number(request.user.id),
          groupId: Number(request.body.groupId),
        },
      },
      select: {
        role: true,
      },
    });

    return !!group?.role && group?.role === 'ADMIN';
  }
}
