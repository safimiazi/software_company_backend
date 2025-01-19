import { z } from "zod";

export const adminValidationSchema = z.object({
    id: z.string().uuid("Invalid UUID for id"),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10,15}$/, "Invalid phone number"),
    createdAt: z.date(),
    updateAt : z.date().optional(),
    picture: z.string().url("Invalid URL for picture").optional()
 
});