"use server";

import { serverFetch } from "@/lib/serverFetch";
import { registerSchema } from "@/types/auth";

export async function registerAction(prevState: any, formData: FormData) {
    const rawFormData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    // Validate with Zod
    const parsed = registerSchema.safeParse(rawFormData);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const data = parsed.data;


    try {
        const res = await serverFetch.post("/auth/register", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        // console.log("res", res)

        // Backend response
        const result = await res.json();;
        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Register failed"
            };
        }


        // console.log("result:", result);

        return result
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            message: "Registration failed. Please try again.",
            errors: {},
        };
    }
}