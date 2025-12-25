"use server";

import { loginSchema } from "@/types/auth";
import { serverFetch } from "@/lib/serverFetch";
import { setCookie } from "@/lib/handleToken";
import { validate } from "@/lib/validator";
import { parse } from "cookie"



export const loginAction = async (_: any, formData: FormData): Promise<any> => {
    const parsed = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    const payload = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validation = validate(payload, loginSchema)
    // console.log("formData", formData)
    // console.log("parsed", parsed)


    if (!validate(payload, loginSchema).success) {
        return validate(payload, loginSchema)
    }
    // if (!parsed.success) {
    //     return {
    //         success: false,
    //         message: "Validation failed",
    //         errors: parsed.error.flatten().fieldErrors
    //     };
    // }

    // const data = parsed.data;
    const validated = validate(payload, loginSchema).data
    console.log("data", validated)

    // const res = await serverFetch.post("/auth/login", {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data)
    // });

    const res = await serverFetch.post(`/auth/login`, {
        body: JSON.stringify(validated),
        headers: {
            "Content-Type": "application/json",
        },
        // cache: "no-store",
        // next: {
        //     tags: ["user"],
        // },
    });




    const result = await res.json();
    console.log("login", result)


    let accessTokenObject: null | any = null;



    const tokens = res.headers.getSetCookie()
    const parsedCookie = parse(tokens[0]);


    if (parsedCookie['accessToken']) {
        accessTokenObject = parsedCookie;
    }


    console.log("accessToken", parsedCookie.accessToken)


    await setCookie("accessToken", accessTokenObject.accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: parseInt(accessTokenObject['Max-Age']) || 7 * 24 * 60 * 60 * 1000,
        path: accessTokenObject.Path || "/",
        sameSite: accessTokenObject['SameSite'] || "none",
    });



    // await setCookie("accessToken", result.data.accessToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //     path: "/",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,

    // });



    return result
}

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