"use server";

import { getCookie } from "@/components/auth/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { IUser } from "@/types/user";
import { revalidatePath } from "next/cache";



export const updateUser = async (
    id: string,
    payload: Partial<IUser>
): Promise<IResData<IUser> | null> => {
    try {
        const token = await getCookie("accessToken");

        const res = await serverFetch.patch(`/user/${id}/update`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
            body: JSON.stringify(payload),
        });

        console.log("res", res);
        if (!res.ok) {
            console.log("updateUser failed", await res.text());
            return null;
        }

        const result = await res.json();
        console.log("result", result);
        revalidatePath("/profile");

        return result || null;
    } catch (error) {
        console.log("Error updating user:", error);
        return null;
    }
};
