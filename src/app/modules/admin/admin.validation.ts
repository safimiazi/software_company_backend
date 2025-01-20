import { z } from "zod";

export const adminValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must not exceed 100 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  needsPasswordChange: z.boolean().optional(),
  passwordChangeAt: z.date().optional(),
  role: z
    .enum(["admin", "employee"], {
      message: "Role must be either 'admin' or 'employee'",
    })
    .optional(),
  status: z
    .enum(["active", "blocked"], {
      message: "Status must be either 'active' or 'blocked'",
    })
    .optional(),
  isDeleted: z.boolean().optional(),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, { message: "Phone number must be 10-15 digits" }),
  picture: z
    .string()
    .url({ message: "Picture must be a valid URL" })
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
