import { z } from 'zod';
import { PrismaService } from '@prismaService';

export default z
  .object({
    id: z.number().refine(async (data) => {
      const prisma = new PrismaService();
      return !!(await prisma.user.findUnique({
        where: {
          id: data,
        },
      }));
    }),
    name: z.string(),
    email: z.string().email(),
  })
  .required();
