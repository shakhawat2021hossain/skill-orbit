"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";



export const addCourse = async (payload: any): Promise<any | null> => {
	try {
		const token = await getCookie("token");

		const res = await serverFetch.post("/course/create", {
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `${token}` } : {}),
			},
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			console.log("addCourse failed", await res.text());
			return null;
		}

		const result = await res.json();
		return result?.data || result || null;
	} catch (error) {
		console.log("Error creating course:", error);
		return null;
	}
};
