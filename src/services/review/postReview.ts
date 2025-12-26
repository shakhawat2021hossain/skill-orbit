"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { IReview } from "@/types/review";



export const addReview = async (payload: Partial<IReview>): Promise<IReview | null> => {
    try {
        const token = await getCookie("accessToken");

        const res = await serverFetch.post("/review/add", {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
            body: JSON.stringify(payload),
        });
        console.log("res", res)


        if (!res.ok) {
            console.log("add review failed", await res.text());
            return null;
        }

        const result = await res.json();
        console.log("result", result)
        return result?.data || result || null;
    } catch (error) {
        console.log("Error creating review:", error);
        return null;
    }
};
