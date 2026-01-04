"use server";

import { serverFetch } from "@/lib/serverFetch";

export const resetPass = async (payload: { userId: string; token: string; password: string }): Promise<any> => {
    const res = await serverFetch.post(`/auth/reset-password`, {
        body: JSON.stringify({ id: payload.userId, newPassword: payload.password }),
        headers: {
            "Content-Type": "application/json",
            ...{ Authorization: payload.token }
        },
    });
    console.log("res", res)

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err?.message || "Reset password request failed");
    }

    const result = await res.json();
    console.log("result", result)
    return result;
};
