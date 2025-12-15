import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Star, ArrowRight, Search, Filter, TrendingUp, Award, Zap, ChevronRight, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCourses } from "@/services/course/getCourses";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function CoursesPage() {
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        return `${hours}h`;
    };

    const courses = await getCourses();

    // Mock categories for filtering
    const categories = [
        "All Categories",
        "Web Development",
        "Data Science",
        "Mobile Development",
        "UI/UX Design",
        "Business",
        "Marketing",
        "Photography"
    ];

    // Mock popular tags
    const popularTags = [
        "React", "JavaScript", "Python", "Node.js", "AWS", "Machine Learning",
        "Figma", "Swift", "Kotlin", "DevOps", "Blockchain", "Cybersecurity"
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Hero Section */}
            {/* <CoursesHeroSection/> */}
            <div className="bg-white">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Master New Skills
                        <span className="text-blue-600 block">From Industry Experts</span>
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Learn in-demand skills with project-based courses taught by professionals.
                    </p>

                </div>
            </div>
        </div>

            <div className="container mx-auto px-10 py-12">
                {/* Filters & Categories */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Browse Courses</h2>
                            <p className="text-gray-600">Find the perfect course for your goals</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                            <Tabs defaultValue="all" className="w-auto">
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="popular">Popular</TabsTrigger>
                                    <TabsTrigger value="new">New</TabsTrigger>
                                    <TabsTrigger value="trending">Trending</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>

                    
                </div>
                {/* Courses Grid */}
                <div className="mb-8">
                    {/* <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                            {courses?.length || 0} Courses Available
                        </h3>
                        <div className="text-sm text-gray-600">
                            Sorted by: <span className="font-medium text-gray-900">Most Popular</span>
                        </div>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses?.map((course) => (
                            <Card key={course._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200">
                                {/* Course Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={course.thumbnail as string}
                                        alt={course.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-3 left-3">
                                        <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white">
                                            {course.category}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white">
                                            <Bookmark className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <Badge className="bg-linear-to-r from-blue-500 to-indigo-500 text-white border-none">
                                            ${course.price}
                                        </Badge>
                                    </div>
                                </div>

                                <CardContent className="p-5">
                                    {/* Title & Instructor */}
                                    <div className="mb-3">
                                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                                            <Link
                                                href={`/courses/${course._id}`}
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                {course.title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-600">By {course.instructor}</p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    {/* Course Stats */}
                                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {formatDuration(course?.totalDuration || 150)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            {(course?.students?.length || 10).toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                            {course?.rating || 4.8}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {course?.tags?.slice(0, 3).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs rounded-full px-2 py-0">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {course?.tags && course.tags.length > 3 && (
                                            <Badge variant="outline" className="text-xs rounded-full px-2 py-0">
                                                +{course.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter className="p-5 pt-0">
                                    <Button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group-hover:shadow-lg transition-all" asChild>
                                        <Link href={`/courses/${course._id}`}>
                                            View Course Details
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4 rotate-180" />
                        </Button>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Button
                                key={num}
                                variant={num === 1 ? "default" : "outline"}
                                size="icon"
                                className={num === 1 ? "bg-blue-600 hover:bg-blue-700" : ""}
                            >
                                {num}
                            </Button>
                        ))}
                        <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-blue-700 font-medium mb-6">
                            <Award className="h-4 w-4" />
                            30-Day Money-Back Guarantee
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Start Learning Risk-Free
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                            Join our community of learners. If you're not satisfied within 30 days,
                            we'll give you a full refund—no questions asked.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8" asChild>
                                <Link href="/register">
                                    <Zap className="h-5 w-5" />
                                    Start Free Trial
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8" asChild>
                                <Link href="/contact">
                                    Need Help? Contact Us
                                </Link>
                            </Button>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-green-500" />
                                <span>Certificate of Completion</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-blue-500" />
                                <span>Community Support</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-purple-500" />
                                <span>Lifetime Access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
