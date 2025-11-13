import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  mobile: z
    .string({ error: 'Please Enter Mobile Number' })
    .min(1, 'Please Enter Mobile Number')
    .default(''),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
