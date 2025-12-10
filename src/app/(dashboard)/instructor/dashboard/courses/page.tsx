"use client";

import { useEffect, useState } from "react";
import { ICourse } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import Link from "next/link";
import { getInsCourses } from "@/services/course/getInsCourses";
import CourseCard from "@/components/dashboard/instructor/CourseCard";

const InstructorCourses = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await getInsCourses();
            setCourses(data || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-muted-foreground">Loading courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and track your published courses
                    </p>
                </div>
                <Button asChild>
                    <Link href="/instructor/courses/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Course
                    </Link>
                </Button>
            </div>

            {courses.length === 0 ? (
                <div className="text-center max-w-md mx-auto py-12">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">No Courses Yet</h2>
                    <p className="text-muted-foreground mb-6">
                        Create your first course to start teaching and earning
                    </p>
                    <Button asChild>
                        <Link href="/instructor/courses/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Your First Course
                        </Link>
                    </Button>
                </div>
            ) : (
                <>
                    {/* Stats Summary */}
                    <div className="bg-muted p-4 rounded-lg mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{courses.length}</p>
                                <p className="text-sm text-muted-foreground">Total Courses</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {/* {courses.reduce((sum, course) => sum + (course.enrollments || 0), 0)} */}
                                    130
                                </p>
                                <p className="text-sm text-muted-foreground">Total Students</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {/* ${courses.reduce((sum, course) => sum + (course.revenue || 0), 0).toFixed(2)} */}
                                    $540
                                </p>
                                <p className="text-sm text-muted-foreground">Total Revenue</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {new Set(courses.map(course => course.category)).size}
                                </p>
                                <p className="text-sm text-muted-foreground">Categories</p>
                            </div>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div> */}
                    {/* Courses Table */}
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-4 text-left font-semibold">Course</th>
                                    <th className="p-4 text-left font-semibold">Category</th>
                                    <th className="p-4 text-left font-semibold">Students</th>
                                    <th className="p-4 text-left font-semibold">Price</th>
                                    {/* <th className="p-4 text-left font-semibold">Revenue</th> */}
                                    <th className="p-4 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {courses.map((course) => (
                                    <tr
                                        key={course._id}
                                        className="border-t hover:bg-muted/40 transition-colors"
                                    >
                                        {/* Thumbnail + Title */}
                                        <td className="p-4 flex items-center gap-3">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-14 h-14 object-cover rounded-md"
                                            />
                                            <div>
                                                <p className="font-medium">{course.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    {course.description}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="p-4">
                                            <span className="text-muted-foreground">{course.category}</span>
                                        </td>

                                        {/* Students */}
                                        <td className="p-4">
                                            {course.students?.length || 0}
                                        </td>

                                        {/* Price */}
                                        <td className="p-4">
                                            ${course.price}
                                        </td>

                                        {/* Revenue */}
                                        {/* <td className="p-4">
                                            ${course?.revenue || 0}
                                        </td> */}

                                        {/* Action Button */}
                                        <td className="p-4 text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/instructor/dashboard/courses/${course._id}`}>
                                                    View
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </>
            )}
        </div>
    );
};

export default InstructorCourses;