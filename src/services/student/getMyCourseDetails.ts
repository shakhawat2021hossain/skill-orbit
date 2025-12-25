"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { IMyCourseDetails } from "@/types/course";

export const getMyCourseDeatils = async (id: string): Promise<IMyCourseDetails | null> => {
    const token = await getCookie("accessToken");

    try {
        const res = await serverFetch.get(`/enrollment/${id}`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
        });
        // console.log(" res", res);

        if (!res.ok) {
            console.log("fetch enrolled course detailed");
            return null;
        }

        const result = await res.json();
        // console.log("course res", result.data);

        return result?.data || result || null;
    } catch (error) {
        console.log("Error fetching courses:", error);
        return null;
    }
};


