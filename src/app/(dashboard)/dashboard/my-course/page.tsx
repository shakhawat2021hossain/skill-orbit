import { Button } from "@/components/ui/button";
import { Plus, BookOpen, ArrowRight, Clock, PlayCircle, BarChart, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { myCourses } from "@/services/course/myCourses";
import { getMyCourseDeatils } from "@/services/student/getMyCourseDetails";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const myCoursesPage = async () => {
    const courses = await myCourses() || [];
    
    const getProgress = async (courseId: string) => {
        const data = await getMyCourseDeatils(courseId);
        return data?.enrollment?.progress || 0;
    };

    // Fetch progress for all courses
    const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
            const progress = await getProgress(course._id);
            return { ...course, progress };
        })
    );

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return "bg-green-500";
        if (progress >= 50) return "bg-blue-500";
        if (progress >= 20) return "bg-yellow-500";
        return "bg-gray-300";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
                        <p className="text-gray-600 mt-2">
                            {courses.length} course{courses.length !== 1 ? 's' : ''} enrolled
                        </p>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Link href="/courses">
                            <Plus className="mr-2 h-4 w-4" />
                            Browse More Courses
                        </Link>
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Courses</p>
                                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                            </div>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">In Progress</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {coursesWithProgress.filter(c => c.progress > 0 && c.progress < 100).length}
                                </p>
                            </div>
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {coursesWithProgress.filter(c => c.progress >= 100).length}
                                </p>
                            </div>
                            <div className="p-2 bg-green-100 rounded-lg">
                                <PlayCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Avg Progress</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {coursesWithProgress.length > 0 
                                        ? Math.round(coursesWithProgress.reduce((sum, c) => sum + c.progress, 0) / coursesWithProgress.length)
                                        : 0}%
                                </p>
                            </div>
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <BarChart className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {courses.length === 0 ? (
                <div className="max-w-2xl mx-auto py-16 text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="h-12 w-12 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Start Your Learning Journey</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        You haven't enrolled in any courses yet. Browse our catalog and start learning today!
                    </p>
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Link href="/courses">
                            <Plus className="mr-2 h-5 w-5" />
                            Browse Available Courses
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coursesWithProgress.map((course) => (
                            <div 
                                key={course._id} 
                                className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Course Thumbnail */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* <div className="absolute top-3 right-3">
                                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                                            ${course.price}
                                        </Badge>
                                    </div> */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                                            {course.category}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Course Content */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                {course.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Section */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-semibold text-gray-900">{course.progress}%</span>
                                        </div>
                                        <div className="relative">
                                            <Progress 
                                                value={course.progress} 
                                                className="h-2"
                                            />
                                            <div 
                                                className={`absolute top-0 left-0 h-2 rounded-full ${getProgressColor(course.progress)} transition-all duration-500`}
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Clock className="h-3 w-3" />
                                            <span>Updated recently</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mt-6">
                                        <Button
                                            asChild
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                        >
                                            <Link href={`/dashboard/my-course/${course._id}`}>
                                                {course.progress === 0 ? (
                                                    <>
                                                        <PlayCircle className="mr-2 h-4 w-4" />
                                                        Start Learning
                                                    </>
                                                ) : course.progress === 100 ? (
                                                    <>
                                                        <BookOpen className="mr-2 h-4 w-4" />
                                                        Review Course
                                                    </>
                                                ) : (
                                                    <>
                                                        <ArrowRight className="mr-2 h-4 w-4" />
                                                        Continue
                                                    </>
                                                )}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Alternative: List View (Toggle if needed) */}
                    <div className="hidden"> {/* Hidden by default, can be toggled */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="text-left p-4 font-semibold text-gray-700">Course</th>
                                            <th className="text-left p-4 font-semibold text-gray-700">Progress</th>
                                            <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                                            <th className="text-left p-4 font-semibold text-gray-700">Last Accessed</th>
                                            <th className="text-left p-4 font-semibold text-gray-700"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {coursesWithProgress.map((course) => (
                                            <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <img
                                                                src={course.thumbnail}
                                                                alt={course.title}
                                                                className="w-12 h-12 object-cover rounded-lg"
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                                                                {course.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 truncate">
                                                                {course.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="w-32">
                                                        <div className="flex items-center justify-between text-xs mb-1">
                                                            <span className="text-gray-600">{course.progress}%</span>
                                                        </div>
                                                        <div className="relative">
                                                            <Progress value={course.progress} className="h-1.5" />
                                                            <div 
                                                                className={`absolute top-0 left-0 h-1.5 rounded-full ${getProgressColor(course.progress)}`}
                                                                style={{ width: `${course.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <Badge variant="outline" className="text-xs">
                                                        {course.category}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 text-sm text-gray-600">
                                                    Recently
                                                </td>
                                                <td className="p-4">
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                    >
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default myCoursesPage;