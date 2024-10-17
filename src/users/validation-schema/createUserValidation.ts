import { z } from 'zod';
import { PrismaService } from '@prismaService';

export default z
  .object({
    name: z.string(),
    email: z
      .string()
      .email()
      .refine(
        async (email: string) => {
          const prisma = new PrismaService();
          return !(await prisma.user.findUnique({ where: { email } }));
        },
        {
          message: 'email already registered',
        },
      ),
    password: z.string().min(6),
    confirmationPassword: z.string().min(6),
  })
  .required()
  .refine((data) => data.password === data.confirmationPassword, {
    message: 'Passwords do not match',
    path: ['confirmationPassword'],
  });
