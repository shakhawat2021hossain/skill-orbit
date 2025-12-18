"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getCookie } from "@/components/auth/handleToken";

export const addToWishlist = async (courseId: string): Promise<any | null> => {
    try {
        const token = await getCookie("accessToken");

        const res = await serverFetch.post(`/wishlist/${courseId}`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
            body: JSON.stringify({}),
        });
        
        console.log("res", res)
        if (!res.ok) {
            console.log("addToWishlist failed", await res.text());
            return null;
        }
        
        const result = await res.json();
        console.log("result", result)
        return result?.data || result || null;
    } catch (error) {
        console.log("Error adding to wishlist:", error);
        return null;
    }
};