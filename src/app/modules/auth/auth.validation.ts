import { z } from "zod";

export const authValidation = z.object({
  body: z.object({
    credential: z.string().min(1, "Email/Phone number is required"),
    password: z.string().min(1, "Password is required"),
  }),
});
