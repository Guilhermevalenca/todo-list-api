import { z } from 'zod';
import { PrismaService } from '@prismaService';

export default z
  .object({
    email: z
      .string()
      .email()
      .refine(
        async (email: string) => {
          const prisma = new PrismaService();
          return !!(await prisma.user.findUnique({ where: { email } }));
        },
        {
          message: 'Email not exists',
        },
      ),
    password: z.string().min(6),
  })
  .required();
