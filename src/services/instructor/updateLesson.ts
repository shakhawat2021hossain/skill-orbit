"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";

export interface UpdateLessonPayload {
  title?: string;
  duration?: number;
  videoUrl?: string;
  resources?: { title: string; link: string }[];
  description?: string;
}

export const updateLesson = async (
  courseId: string,
  lessonId: string,
  payload: UpdateLessonPayload
): Promise<any | null> => {
  try {
    const token = await getCookie("accessToken");

    const res = await serverFetch.patch(`/lesson/${courseId}/${lessonId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    console.log("res", res);
    if (!res.ok) {
      console.log("updateLesson failed", await res.text());
      return null;
    }

    const result = await res.json();
    console.log("result", result);
    
    return result?.data || result || null;
  } catch (error) {
    console.log("Error updating lesson:", error);
    return null;
  }
};
