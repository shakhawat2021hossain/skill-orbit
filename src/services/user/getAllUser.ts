"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { IUser } from "@/types/user";

export interface IUserApiResponse {
    data: IUser[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export const getUsers = async (
    page = 1,
    limit = 10
): Promise<IUserApiResponse | null> => {
    try {
        const token = await getCookie("token");
        if (!token) return null;

        const res = await serverFetch.get(
            `/user/all?page=${page}&limit=${limit}`,
            {
                headers: { Authorization: `${token}` },
            }
        );

        if (!res.ok) return null;

        return await res.json();
    } catch (e) {
        console.log("User fetch error", e);
        return null;
    }
};
