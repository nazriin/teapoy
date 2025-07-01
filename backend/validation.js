import { z } from 'zod';

export const userRegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    surname: z.string().optional(),
    role: z.enum(['user', 'seller', 'admin']).default('user')
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

export const sellerRegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    surname: z.string().optional(),
    storeName: z.string().min(1, "Store name is required"),
    description: z.string().min(1, "Description is required"),
    businessLicense: z.string().min(1, "Business license is required"),
    address: z.object({
        street: z.string().min(1, "Street is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        country: z.string().min(1, "Country is required"),
        postalCode: z.string().min(1, "Postal code is required")
    })
});