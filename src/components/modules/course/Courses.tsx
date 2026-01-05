"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ICourse } from "@/types/course";
import CourseCard from "./CourseCard"; // your existing course card component
import { getCourses } from "@/services/course/getCourses";

interface Props {
    initialCourses: ICourse[];
    initialMeta?: {
        page: number;
        limit: number;
        total: number;
    };
}

export default function Courses({ initialCourses, initialMeta }: Props) {
    const [courses, setCourses] = useState(initialCourses);
    const [page, setPage] = useState(initialMeta?.page ?? 1);
    const [limit] = useState(initialMeta?.limit ?? 5);
    const [total, setTotal] = useState(initialMeta?.total ?? initialCourses.length);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(total / limit);

    const loadPage = async (newPage: number) => {
        if (loading) return;

        setLoading(true);
        const res = await getCourses(newPage, limit);

        if (res?.data) {
            setCourses(res.data);
            setTotal(res.meta.total);
            setPage(res.meta.page);
        }

        setLoading(false);
    };

    return (
        <>
        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {courses.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center py-8">No courses found</p>
                ) : (
                    courses.map(course => <CourseCard key={course._id} course={course} />)
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">
                    Page {page} of {totalPages} • {total} courses
                </p>

                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        disabled={page === 1 || loading}
                        onClick={() => loadPage(page - 1)}
                    >
                        Previous
                    </button>

                    <button
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        disabled={page === totalPages || loading}
                        onClick={() => loadPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {loading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            )}
        </>
    );
}
