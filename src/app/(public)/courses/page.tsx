import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCourses } from "@/services/course/getCourses";
import { ICourse } from "@/types/course";



export default async function CoursesPage() {
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        return `${hours} hours`;
    };

    const courses = await getCourses()
    console.log(courses)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">All Courses</h1>
                    <p className="text-xl text-blue-100">
                        Explore our collection of expert-led courses
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {courses?.length} Courses Available
                        </h2>
                        <p className="text-gray-600">Start learning today</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/categories">
                            Browse Categories
                        </Link>
                    </Button>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses && courses.map((course) => (
                        <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Course Image */}
                            <div className="relative h-48">
                                <Image
                                    src={course.thumbnail as string}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-blue-600 text-white">
                                        {course.category}
                                    </Badge>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    <Link href={`/courses/${course._id}`} className="hover:text-blue-600">
                                        {course.title}
                                    </Link>
                                </h3>

                                {/* Instructor */}
                                <p className="text-gray-600 mb-3">By {course.instructor}</p>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                {/* Course Info */}
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {formatDuration(course?.totalDuration || 150)}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-1" />
                                        {course?.students?.length.toLocaleString() || 10} students
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                        {course?.rating || 4.8}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course?.tags?.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${course.price}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                                    <Link href={`/courses/${course._id}`}>
                                        View Course
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-8 border">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Start Learning Today
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Join thousands of students who have transformed their careers with our courses
                        </p>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8" asChild>
                            <Link href="/register">
                                Get Started Free
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}