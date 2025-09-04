import { z } from "zod"

const email = z.string().email().min(5).max(100)
const code = z.string().min(6).max(6)

export const emailSchema = z.object({
    email: email
})
export const verificationSchema = z.object({
    email: email,
    code: code
})