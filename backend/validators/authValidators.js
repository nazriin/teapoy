import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required."),
    email: z.string().email("A valid email is required."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    role: z.enum(['user', 'seller'], { errorMap: () => ({ message: "Role must be user or seller." }) }),
    storeName: z.string().optional(),
    storeDescription: z.string().optional()
});

export const loginSchema = z.object({
    email: z.string().email("A valid email is required."),
    password: z.string().min(1, "Password is required."),
    role: z.enum(['user', 'seller'], { errorMap: () => ({ message: "Role must be user or seller." }) })
});
