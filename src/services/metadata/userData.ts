"use server"

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";

export const getUserMetadata = async (): Promise<any | null> => {
    const token = await getCookie("token");

    try {
        const res = await serverFetch.get("/metadata/user", {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
        });
        console.log(" res", res);

        if (!res.ok) {
            console.log("user metadata fetch failed");
            return null;
        }

        const result = await res.json();
        console.log("course res", result);

        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching user metadata:", error);
        return null;
    }
};
