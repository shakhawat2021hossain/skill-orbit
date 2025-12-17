"use server";

import { getCookie } from "@/components/auth/handleToken";
import { serverFetch } from "@/lib/serverFetch";

export const enrollCourse = async (courseId: string): Promise<any | null> => {
	try {
		const token = await getCookie("accessToken");

		const res = await serverFetch.post(`/enrollment/${courseId}/enroll`, {
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `${token}` } : {}),
			},
			body: JSON.stringify({}),
		});

		console.log("enroll res", res)

		if (!res.ok) {
			console.log("enrollCourse failed", await res.text());
			return null;
		}

		const result = await res.json();
		return result?.data || result || null;
	} catch (error) {
		console.log("Error enrolling course:", error);
		return null;
	}
};

export const updateProgress = async (
	courseId: string,
	lessonId: string
): Promise<any | null> => {
	try {
		const token = await getCookie("accessToken");

		const res = await serverFetch.patch(`/enrollment/${courseId}/progress/${lessonId}`, {
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `${token}` } : {}),
			},
			body: JSON.stringify({}),
		});

		if (!res.ok) {
			console.log("updateProgress failed", await res.text());
			return null;
		}

		const result = await res.json();
		return result?.data || result || null;
	} catch (error) {
		console.log("Error updating progress:", error);
		return null;
	}
};

