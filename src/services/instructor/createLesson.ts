"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";

export interface CreateLessonPayload {
  title: string;
  duration?: number; // minutes
  videoUrl?: string;
}

export const createLesson = async (
  courseId: string,
  payload: CreateLessonPayload
): Promise<any | null> => {
  try {
    const token = await getCookie("accessToken");

    const res = await serverFetch.post(`/lesson/create/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.log("createLesson failed", await res.text());
      return null;
    }

    const result = await res.json();
    return result?.data || result || null;
  } catch (error) {
    console.log("Error creating lesson:", error);
    return null;
  }
};
