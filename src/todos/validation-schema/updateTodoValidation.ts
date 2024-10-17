import { z } from 'zod';

export default z
  .object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['not_completed', 'completed', 'in_progress']),
  })
  .required();
