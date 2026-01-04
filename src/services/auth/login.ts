"use server";

import { loginSchema } from "@/types/auth";
import { serverFetch } from "@/lib/serverFetch";
import { validate } from "@/lib/validator";
import { cookies } from "next/headers";



export const loginAction = async (_: any, formData: FormData): Promise<any> => {
    const payload = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validation = validate(payload, loginSchema)
    // console.log("formData", formData)
    // console.log("parsed", parsed)


    if (!validation.success) {
        return validate(payload, loginSchema)
    }

    const validated = validate(payload, loginSchema).data
    console.log("data", validated)

    const res = await serverFetch.post(`/auth/login`, {
        body: JSON.stringify(validated),
        headers: {
            "Content-Type": "application/json",
        },
    });



    console.log("login", res)

    const result = await res.json();
    console.log("login", result)

    if (!res.ok) {
        return {
            success: false,
            message: result?.message || "Login failed"
        };
    }



    const cookieStore = await cookies()
    cookieStore.set({
        name: 'token',
        value: result.data.accessToken,
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        path: '/',
    })

    return result
}



