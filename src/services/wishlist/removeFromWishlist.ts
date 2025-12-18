"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getCookie } from "@/components/auth/handleToken";

export const removeFromWishlist = async (courseId: string): Promise<boolean> => {
    try {
        const token = await getCookie("accessToken");

        const res = await serverFetch.delete(`/wishlist/${courseId}`, {
            headers: {
                ...(token ? { Authorization: `${token}` } : {}),
            },
        });

        if (!res.ok) {
            console.log("removeFromWishlist failed", await res.text());
            return false;
        }

        return true;
    } catch (error) {
        console.log("Error removing from wishlist:", error);
        return false;
    }
};