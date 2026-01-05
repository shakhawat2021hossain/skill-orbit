"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { IEnrollment } from "@/types/course";
import { IUser } from "@/types/user";

export interface IEnrollmentResponse {
    data: Partial<IEnrollment>[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export const getEnrollments = async (
    page = 1,
    limit = 5
): Promise<IEnrollmentResponse | null> => {
    try {
        const token = await getCookie("token");
        if (!token) return null;

        const res = await serverFetch.get(`/enrollment/data?page=${page}&limit=${limit}`,
            {
                headers: { Authorization: `${token}` },
            }
        );

        if (!res.ok) return null;

        return await res.json();
    } catch (e) {
        console.log("Enrollment fetch error", e);
        return null;
    }
};
