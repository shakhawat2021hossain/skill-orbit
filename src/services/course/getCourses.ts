"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { ICourse } from "@/types/course";

// public
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
        console.log("Error fetching user courses:", error);
        return null;
    }
};





export const getCoursesForAdmin = async (): Promise<ICourse[] | null> => {
    const token = await getCookie("accessToken");

    try {
        const res = await serverFetch.get("/course/for-admin", {
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




