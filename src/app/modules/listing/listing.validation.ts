import { z } from "zod";
import { Condition, ListingStatus } from "./listing.interface";

export const listingValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" })
      .trim(),

    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(1000, { message: "Description must not exceed 1000 characters" })
      .trim(),

    price: z.number().positive({ message: "Price must be a positive number" }),

    condition: z.nativeEnum(Condition, { message: "Invalid condition type" }),

    images: z
      .array(z.string().url({ message: "Each image must be a valid URL" }))
      .min(1, { message: "At least one image is required" })
      .max(3, { message: "Max 3 images can select." }),

    userId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user ID format" })
      .optional(),

    status: z
      .nativeEnum(ListingStatus, { message: "Invalid listing status" })
      .default(ListingStatus.AVAILABLE),

    category: z.string().min(1, { message: "Category is required" }).trim(),
  }),
});

export const updateListingValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" })
      .trim()
      .optional(),

    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(1000, { message: "Description must not exceed 1000 characters" })
      .trim()
      .optional(),

    price: z
      .number()
      .positive({ message: "Price must be a positive number" })
      .optional(),

    condition: z
      .nativeEnum(Condition, { message: "Invalid condition type" })
      .optional(),

    images: z
      .array(z.string().url({ message: "Each image must be a valid URL" }))
      .min(1, { message: "At least one image is required" })
      .max(3, { message: "Max 3 images can select." })
      .optional(),

    userId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user ID format" })
      .optional(),

    status: z
      .nativeEnum(ListingStatus, { message: "Invalid listing status" })
      .default(ListingStatus.AVAILABLE)
      .optional(),

    category: z
      .string()
      .min(1, { message: "Category is required" })
      .trim()
      .optional(),
  }),
});
