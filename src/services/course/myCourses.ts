"use server";

import { getCookie } from "@/components/auth/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { ICourse } from "@/types/course";

export const myCourses = async (): Promise<ICourse[] | null> => {
    const token = await getCookie("accessToken");

    try {
        const res = await serverFetch.get("/course/my-courses", {
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
        console.log("Error fetching courses:", error);
        return null;
    }
};


