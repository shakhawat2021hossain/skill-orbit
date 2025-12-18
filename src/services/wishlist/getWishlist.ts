"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getCookie } from "@/components/auth/handleToken";
import { ICourse } from "@/types/course";

export const getWishlist = async (): Promise<ICourse[] | null> => {
    try {
        const token = await getCookie("accessToken");

        const res = await serverFetch.get(`/wishlist`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
        });

        if (!res.ok) {
            console.log("getWishlist failed", await res.text());
            return null;
        }

        const result = await res.json();
        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching wishlist:", error);
        return null;
    }
};