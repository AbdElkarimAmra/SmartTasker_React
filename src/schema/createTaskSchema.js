import {z} from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long"
    }).max(100, {
        message: "Title must be at most 100 characters long"
    }),

    dueDate: z.date({
        required_error: "Due date is required"
    }),
    description: z.string().min(3, {
        message: "Description must be at least 3 characters long"
    }).max(1000, {
        message: "Description must be at most 1000 characters long"
    }),
    status: z.enum(["todo", "inProgress", "completed"]),
    priority: z.enum(["normal", "high", "low"]),
})