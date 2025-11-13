// schemas/login-schema.ts
import { z } from 'zod';
// TODO: The schema and validation rule will be fetched dynamically from the database and will form the object
//INFO: the default() is just added for parsing fieldname for initialvalues in formik, can be remooved later but than have to fine other solution
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').default(''),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .default(''),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
