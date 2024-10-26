import { z } from 'zod';
import { PrismaService } from '@prismaService';

const todoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    status: z
      .enum(['not_completed', 'completed', 'in_progress'])
      .default('not_completed'),
    groupId: z.number().refine(async (data) => {
      const prisma = new PrismaService();
      return !!(await prisma.group.findUnique({
        where: {
          id: data,
        },
      }));
    }),
  })
  .required();

const usersSchema = z
  .object({
    id: z.number(),
  })
  .array();

export default z
  .object({
    todo: todoSchema,
    users: usersSchema,
  })
  .required();
