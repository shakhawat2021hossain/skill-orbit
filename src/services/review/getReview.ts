"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IReview } from "@/types/review";

// public
export const getReviews = async (courseId: string): Promise<IReview[] | null> => {
    try {
        const res = await serverFetch.get(`/review/${courseId}`);
        console.log(" res", res);

        if (!res.ok) {
            console.log("course review fetch failed");
            return null;
        }

        const result = await res.json();
        console.log("course res", result);

        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching courses reviews:", error);
        return null;
    }
};



