import { z } from 'zod';

export default z
  .object({
    name: z.string(),
    email: z.string().email(),
  })
  .required();
