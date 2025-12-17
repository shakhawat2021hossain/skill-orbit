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
        console.log("enroll course", result.data[0]);

        return result?.data[0] || result || null;
    } catch (error) {
        console.log("Error fetching user info:", error);
        return null;
    }
};


