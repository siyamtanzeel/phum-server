import { z } from 'zod';

const userValidationSchema = z.object({
  password: z.string().min(1).max(20),
});
export default userValidationSchema;
