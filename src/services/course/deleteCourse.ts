"use server";

import { getCookie } from "@/components/auth/handleToken";
import { serverFetch } from "@/lib/serverFetch";

export const updateDeleteOperation = async (
    courseId: string
): Promise<boolean> => {
    try {
        const token = await getCookie("accessToken");
        // console.log("courseId", courseId, lessonId)

        const res = await serverFetch.patch(`/course/${courseId}/toggle-delete`, {
            headers: {
                ...(token ? { Authorization: `${token}` } : {}),
            },
        });
        console.log("res", res)

        if (!res.ok) {
            console.log("delete course failed", await res.text());
            return false;
        }
        const result = await res.json();
        console.log("result", result)
        return result?.data || result || null;


    } catch (error) {
        console.log("Error deleting lesson:", error);
        return false;
    }
};
