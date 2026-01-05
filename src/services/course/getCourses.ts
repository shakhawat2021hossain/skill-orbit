"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { ICourse } from "@/types/course";

// public

export interface ICourseApiResponse {
    data: ICourse[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export const getCourses = async (
    page = 1,
    limit = 3
): Promise<ICourseApiResponse | null> => {
    try {
        const res = await serverFetch.get(
            `/course/all?page=${page}&limit=${limit}`
        );

        if (!res.ok) {
            console.log("courses fetch failed");
            return null;
        }

        return await res.json();
    } catch (error) {
        console.log("Error fetching courses:", error);
        return null;
    }
};






export const getCoursesForAdmin = async (): Promise<ICourse[] | null> => {
    const token = await getCookie("token");

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




