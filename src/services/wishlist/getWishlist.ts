"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { ICourse } from "@/types/course";

export const getWishlist = async (): Promise<ICourse[] | null> => {
    try {
        const token = await getCookie("token");

        const res = await serverFetch.get(`/wishlist/get-all`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
        });
        console.log("res", res)

        if (!res.ok) {
            console.log("getWishlist failed", await res.text());
            return null;
        }

        const result = await res.json();
        console.log("result", result)
        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching wishlist:", error);
        return null;
    }
};