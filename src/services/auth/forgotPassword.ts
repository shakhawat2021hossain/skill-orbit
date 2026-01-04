"use server";

import { serverFetch } from "@/lib/serverFetch";


export const forgotPass = async (payload: { email: string }): Promise<any> => {

    const res = await serverFetch.post(`/auth/forgot-password`, {
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("res", res)

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err?.message || "Forgot password request failed");
    }

    const result = await res.json();
    console.log("result", result)
    return result;
}


