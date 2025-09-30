import {z} from "zod";

export const SignupSchema = z.object({
    firstName: z.string().min(3, {
        message: "First name must be at least 3 characters long"
    }).max(100, {
        message: "First name must be at most 100 characters long"
    }),
    lastName: z.string().min(3, {
        message: "Last name must be at least 3 characters long"
    }).max(100, {
        message: "Last name must be at most 100 characters long"
    }).optional(),
    email: z.string().email({
        message: "Invalid email address"
    }).min(5, {
        message: "Email must be at least 5 characters long"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    })
})