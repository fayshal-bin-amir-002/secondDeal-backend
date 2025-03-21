import { z } from "zod";
import { Locations, UserRole } from "./user.interface";

export const userValidation = z.object({
  body: z.object({
    name: z.string().trim().min(2, {
      message: "Name is required and must be at least 2 characters long",
    }),
    email: z
      .string()
      .trim()
      .email({ message: "A valid email is required" })
      .min(1, { message: "Email is required" }),
    phoneNumber: z.string().trim().min(11, {
      message: "Phone number is required and must be 11 digits",
    }),
    password: z.string().trim().min(6, {
      message: "Password is required and must be at least 6 characters long",
    }),
    location: z
      .string()
      .trim()
      .min(1, { message: "Location is required." })
      .refine(
        (value) => Object.values(Locations).includes(value as Locations),
        {
          message: "Invalid location. Please select a valid location.",
        }
      ),
    role: z.nativeEnum(UserRole).default(UserRole.USER),
    isActive: z.boolean().default(true),
  }),
});

export const userUpdateValidation = z.object({
  body: z.object({
    name: z.string().trim().min(2, {
      message: "Name is required and must be at least 2 characters long",
    }),
    email: z
      .string()
      .trim()
      .email({ message: "A valid email is required" })
      .min(1, { message: "Email is required" }),
    phoneNumber: z.string().trim().min(11, {
      message: "Phone number is required and must be 11 digits",
    }),
    location: z
      .string()
      .trim()
      .min(1, { message: "Location is required." })
      .refine(
        (value) => Object.values(Locations).includes(value as Locations),
        {
          message: "Invalid location. Please select a valid location.",
        }
      ),
  }),
});
