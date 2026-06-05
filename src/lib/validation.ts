import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(150, "Company name must be under 150 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .max(30, "Phone number must be under 30 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  category: z
    .string()
    .max(100, "Category selection is invalid")
    .trim()
    .optional()
    .or(z.literal("")),
  quantity: z
    .string()
    .max(50, "Quantity must be under 50 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters")
    .trim(),
  honeypot: z.string().max(0, "Invalid submission").optional(),
  hasCustomBag: z.boolean().optional(),
  customImage: z.string().optional(),
  customImageName: z.string().optional(),
  customDescription: z.string().optional(),
  customQuantity: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
