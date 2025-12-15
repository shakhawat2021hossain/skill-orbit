"use server";

import { loginSchema } from "@/types/auth";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { serverFetch } from "@/lib/serverFetch";



export const loginAction = async (_: any, formData: FormData): Promise<any> => {
    const parsed = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    // console.log("formData", formData)
    // console.log("parsed", parsed)

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: parsed.error.flatten().fieldErrors
        };
    }

    const data = parsed.data;

    // Example API request
    // const res = await fetch(`http://localhost:5000/api/auth/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    // });
    const res = await serverFetch.post("/auth/login", {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    // const res = await fetch(`http://localhost:5000/api/auth/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    // });
    // console.log("res", res)

    let accessTokenObject: null | any = null;



    const tokens = res.headers.getSetCookie()
    const parsedCookie = parse(tokens[0]);


    if (parsedCookie['accessToken']) {
        accessTokenObject = parsedCookie;
    }


    // console.log("accessToken", parsedCookie.accessToken)

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessTokenObject.accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
        path: accessTokenObject.Path || "/",
        sameSite: accessTokenObject['SameSite'] || "none",
    });



    // Backend response
    const result = await res.json();


    // console.log("result", result)

    return result
}
