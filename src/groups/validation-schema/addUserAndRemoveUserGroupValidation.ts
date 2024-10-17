import { z } from 'zod';
import { PrismaService } from '@prismaService';

export default z
  .object({
    groupId: z.number().refine(async (data) => {
      const prisma = new PrismaService();
      return !!(await prisma.group.findUnique({
        where: {
          id: data,
        },
      }));
    }),
    userId: z.number().refine(async (data) => {
      const prisma = new PrismaService();
      return !!(await prisma.user.findUnique({
        where: {
          id: data,
        },
      }));
    }),
  })
  .required();
