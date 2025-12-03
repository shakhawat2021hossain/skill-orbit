"use server";

import { loginSchema } from "@/validation/auth";


export const loginAction = async (_: any, formData: FormData): Promise<any> => {
    const parsed = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    console.log("formData", formData)
    console.log("parsed", parsed)

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors
        };
    }

    const data = parsed.data;

    // Example API request
    const res = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    console.log("res", res)

    // if (!res.ok) {
    //     return { success: false, message: "Invalid credentials" };
    // }

    // Backend response
    const result = await res.json();

    
    console.log("result", result)
    
    if (!result.success) {
        return { success: false, user: result };
    }

    return { success: true, user: result };
}
