import { z } from 'zod';

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{8,30}$/;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(30, 'Password must be at most 30 characters')
      .regex(
        passwordRegex,
        'Password must include at least 1 uppercase letter, 1 number and 1 special character'
      )
      .default(''),
    confirm_password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(30, 'Password must be at most 30 characters')
      .regex(
        passwordRegex,
        'Password must include at least 1 uppercase letter, 1 number and 1 special character'
      )
      .default(''),
    phone: z.string().default(''),
    resetToken: z.string().default(''),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
