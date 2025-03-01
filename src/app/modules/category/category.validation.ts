import { z } from "zod";

export const categoryValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string().url({ message: "A valid URL is required" }),
  }),
});
