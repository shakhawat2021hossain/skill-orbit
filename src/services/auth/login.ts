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




    const result = await res.json();
    console.log("login", result)


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




// let accessTokenObject: null | any = null;
// const tokens = res.headers.getSetCookie()
// const parsedCookie = parse(tokens[0]);

// if (parsedCookie['accessToken']) {
//     accessTokenObject = parsedCookie;
// }
// console.log("accessToken", parsedCookie.accessToken)
// await setCookie("accessToken", result.data.accessToken, {
//     httpOnly: true,
//     secure: true,
//     maxAge: 24 * 60 * 60, // 24 hours in seconds
//     sameSite: "none",
// });
// await setCookie("accessToken", result.data.accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 60 * 60 * 24,
//     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//     path: "/",
// });



// await setCookie("accessToken", accessTokenObject.accessToken, {
//     secure: true,
//     httpOnly: true,
//     maxAge: parseInt(accessTokenObject['Max-Age']) || 7 * 24 * 60 * 60 * 1000,
//     path: accessTokenObject.Path || "/",
//     sameSite: accessTokenObject['SameSite'] || "none",
// });



// await setCookie("accessToken", result.data.accessToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     path: "/",
//     maxAge: 7 * 24 * 60 * 60 * 1000,

// });