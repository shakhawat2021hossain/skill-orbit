"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { IUser } from "@/types/user";

export const getInsDetails = async (): Promise<IUser | null> => {
    const token = await getCookie("accessToken");

    try {
        const res = await serverFetch.get(`/user/details`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
        });
        console.log(" res", res);

        if (!res.ok) {
            console.log("instructor details fetch failed");
            return null;
        }

        const result = await res.json();
        console.log("course res", result);

        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching instructor details:", error);
        return null;
    }
};


