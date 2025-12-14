import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import Link from "next/link";
import { myCourses } from "@/services/course/myCourses";

const myCoursesPage = async () => {

    const courses = await myCourses() || [];

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and track your courses
                    </p>
                </div>
                <Button asChild>
                    <Link href="/courses">
                        <Plus className="mr-2 h-4 w-4" />
                        Pucrhcase New Course
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


                    {/* Courses Table */}
                    <div className="overflow-x-auto rounded-lg border m-12">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-4 text-left font-semibold">Course</th>
                                    <th className="p-4 text-left font-semibold">Category</th>
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
                                            <span className="text-muted-foreground">{course.category || "Web Development"}</span>
                                        </td>

                                        {/* Action Button */}
                                        <td className="p-4 text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/dashboard/my-course/${course._id}`}>
                                                    Continue
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

export default myCoursesPage;