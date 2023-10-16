import { z } from 'zod';

// TODO: Add proper validations for passwords

/*
 * Login Form Input Schema
 */
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
  password: z.string().min(1, 'Password is required').trim(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

/*
 * Reset Password Form Input Schema
 */
export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// TODO: Add Schema for Signup Form
