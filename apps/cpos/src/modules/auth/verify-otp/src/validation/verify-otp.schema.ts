import { z } from 'zod';

export const verifyOtpSchema = z.object({
  otp: z
    .string({ error: 'Please Enter OTP' })
    .min(1, 'Please Enter OTP')
    .regex(/^\d+$/, 'OTP must contain only digits')
    .length(6, 'OTP must be 6 digits')
    .default(''),
  phone: z.string().default(''),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
