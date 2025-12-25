import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Filter, Award, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getCourses } from "@/services/course/getCourses";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/modules/course/CourseCard";

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
                            <CourseCard course={course} key={course._id}/>
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
