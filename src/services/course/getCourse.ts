"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ICourse } from "@/types/course";

export const getCourse = async (id: string): Promise<ICourse | null> => {
    // console.log("id", id)
    try {
        const res = await serverFetch.get(`/course/${id}`);
        console.log("enroll course res", res);

        if (!res.ok) {
            console.log("courses fetch failed");
            return null;
        }

        const result = await res.json();
        console.log("enroll course", result);

        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching user course:", error);
        return null;
    }
};


