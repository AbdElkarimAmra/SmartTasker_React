import {z} from "zod";


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }).min(5, {
        message: "Email must be at least 5 characters long"
    }),
    password: z.string()
})