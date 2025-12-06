"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ICourse } from "@/types/course";

export const getCourses = async (): Promise<ICourse[] | null> => {
    try {
        const res = await serverFetch.get("/course/all");
        // console.log(" res", res);

        if (!res.ok) {
            console.log("courses fetch failed");
            return null;
        }

        const result = await res.json();
        // console.log("course res", result);

        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching user info:", error);
        return null;
    }
};
