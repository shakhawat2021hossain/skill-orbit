"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { IUser } from "@/types/user";



export const getUsers = async (): Promise<IUser[] | null> => {
    try {
        // Read access token
        const token = await getCookie("accessToken");

        if (!token) {
            console.log("No access token found.");
            return null;
        }
        // console.log("getting user")
        const response = await serverFetch.get("/user/all", {
            headers: {
                Authorization: `${token}`,
            },
        });

        if (!response.ok) {
            console.log("Users fetch failed", await response.text());
            return null;
        }

        const result = await response.json();
        // console.log("user res", result);

        return result?.data || result?.user || result || null;
    } catch (error) {
        console.log("Error fetching users info:", error);
        return null;
    }
};
