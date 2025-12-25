"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { ICourse } from "@/types/course";

export const getInsCourses = async (): Promise<ICourse[] | null> => {
    const token = await getCookie("accessToken");

    try {
        const res = await serverFetch.get("/course/ins-courses", {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
        });
        // console.log(" res", res);

        if (!res.ok) {
            console.log("courses fetch failed");
            return null;
        }

        const result = await res.json();
        // console.log("course res", result);

        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching instructor courses:", error);
        return null;
    }
};


