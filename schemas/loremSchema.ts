import { z } from "zod";

export const loremSchema = z.object({
    name: z.string().min(2, {
      message: "information must be at least 2 characters.",
    }),
  })