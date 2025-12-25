"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";

export const updateCourse = async (
  courseId: string,
  payload: Record<string, any>
): Promise<any | null> => {
  try {
    const token = await getCookie("accessToken");

    const res = await serverFetch.patch(`/course/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.log("updateCourse failed", await res.text());
      return null;
    }

    const result = await res.json();
    return result?.data || result || null;
  } catch (error) {
    console.log("Error updating course:", error);
    return null;
  }
};
