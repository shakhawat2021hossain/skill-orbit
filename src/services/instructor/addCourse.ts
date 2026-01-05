"use server";

import { getCookie } from "@/lib/handleToken";
import { serverFetch } from "@/lib/serverFetch";
import { ICourse, courseSchema } from "@/types/course";

export async function addCourse(prevState: any, formData: FormData) {
    // Build raw payload from FormData
    const raw = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        category: formData.get("category"),
        instructor: formData.get("instructor"),
    };

    // Convert price to number
    const parsedPrice = raw.price ? Number(raw.price) : undefined;

    const parsed = courseSchema.safeParse({
        title: raw.title,
        description: raw.description,
        price: parsedPrice,
        category: raw.category,
        instructor: raw.instructor,
    });

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        const token = await getCookie("token");

        const res = await serverFetch.post("/course/create-course", {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `${token}` } : {}),
            },
            body: JSON.stringify(parsed.data),
        });

        const result = await res.json();

        if (!res.ok) {
            console.log("addCourse failed", await res.text());
            return {
                success: false,
                message: result?.message || "Add course failed",
                errors: result?.errors || {},
            };
        }

        return result;
    } catch (error) {
        console.log("Error creating course:", error);
        return {
            success: false,
            message: "Course creation failed. Please try again.",
            errors: {},
        };
    }
}
