import { z } from 'zod';
import { PrismaService } from '@prismaService';

export default z
  .object({
    groupId: z.number().refine(async (data: number) => {
      const prisma = new PrismaService();
      return !!(await prisma.group.findUnique({
        where: {
          id: data,
        },
      }));
    }),
    email: z
      .string()
      .email()
      .refine(async (data: string) => {
        const prisma = new PrismaService();
        return !!(await prisma.user.findUnique({
          where: {
            email: data,
          },
        }));
      }),
  })
  .required();
