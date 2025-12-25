"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";

export const deleteLesson = async (
  courseId: string,
  lessonId: string
): Promise<boolean> => {
  try {
    const token = await getCookie("accessToken");
    // console.log("courseId", courseId, lessonId)

    const res = await serverFetch.delete(`/lesson/${courseId}/${lessonId}`, {
      headers: {
        ...(token ? { Authorization: `${token}` } : {}),
      },
    });
    // console.log("res", res)

    if (!res.ok) {
      console.log("deleteLesson failed", await res.text());
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error deleting lesson:", error);
    return false;
  }
};
