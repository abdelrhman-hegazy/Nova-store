import { z } from "zod"

export const emailSchema = z.object({
    email: z.string().email().min(5).max(100)
})