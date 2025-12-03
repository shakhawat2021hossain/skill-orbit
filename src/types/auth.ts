import { z } from "zod";


export const loginSchema = z.object({
    email: z.email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});


export const registerSchema = z.object({
    name: z
        .string()
        .min(4, { message: "Name must be at least 4 characters." }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." })


})




export type RegisterFormData = z.infer<typeof registerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;