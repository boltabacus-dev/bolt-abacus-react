import { z } from 'zod';
import validator from 'validator';

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
    password: z
      .string()
      .refine(
        validator.isStrongPassword,
        'Password should contain minimum of 8 characters with lowercase, uppercase and symbol'
      ),
    confirmPassword: z
      .string()
      .refine(
        validator.isStrongPassword,
        'Password should contain minimum of 8 characters with lowercase, uppercase and symbol'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

/*
 * Forgot Password Form Input Schema
 */
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
