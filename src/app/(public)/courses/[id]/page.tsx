import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Star,
    Clock,
    Users,
    BookOpen,
    Play,
    CheckCircle,
    User,
    Award,
    Download,
    MessageSquare
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const courses = [
    {
        _id: "1",
        title: "Complete Web Development Bootcamp",
        description: "Learn full-stack web development with React, Node.js, MongoDB, and modern tools. This comprehensive course takes you from beginner to job-ready web developer.",
        fullDescription: "This comprehensive web development bootcamp covers everything you need to become a full-stack developer. You'll learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and more. By the end of this course, you'll have built several real-world projects and be ready for junior developer positions.",
        price: 89.99,
        category: "Web Development",
        instructor: "Sarah Johnson",
        instructorBio: "Senior Software Engineer with 10+ years of experience. Previously worked at Google and Microsoft.",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
        introVideo: "https://example.com/video",
        tags: ["React", "Node.js", "MongoDB", "JavaScript", "Full Stack"],
        totalDuration: 2520, // 42 hours in minutes
        students: Array(45000).fill(""),
        rating: 4.9,
        reviews: 12458,
        resources: ["E-book", "Project Files", "Cheat Sheets"],
        syllabus: [
            { id: 1, title: "Introduction to Web Development", duration: 120 },
            { id: 2, title: "HTML & CSS Fundamentals", duration: 180 },
            { id: 3, title: "JavaScript Basics", duration: 240 },
            { id: 4, title: "React Fundamentals", duration: 300 },
            { id: 5, title: "Node.js & Express", duration: 240 },
            { id: 6, title: "MongoDB Database", duration: 180 },
            { id: 7, title: "Full-Stack Project", duration: 240 },
            { id: 8, title: "Deployment & DevOps", duration: 120 },
        ],
        requirements: [
            "Basic computer knowledge",
            "No programming experience required",
            "Internet connection",
        ],
        whatYoullLearn: [
            "Build full-stack web applications",
            "Understand modern JavaScript frameworks",
            "Work with databases and APIs",
            "Deploy applications to production",
            "Follow best practices and coding standards",
        ],
    }
]

export default function CourseDetailsPage({
    params,
}: {
    params: { _id: string };
}) {
    const course = courses[0];

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
                    <Button asChild>
                        <Link href="/courses">Browse Courses</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Course Hero */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl">
                        <Badge className="mb-4 bg-white text-blue-600">
                            {course.category}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {course.title}
                        </h1>
                        <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-6 mb-6">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium">{course.instructor}</p>
                                    <p className="text-sm text-blue-200">Instructor</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-2" />
                                <span className="text-xl font-bold">{course.rating}</span>
                                <span className="ml-2 text-blue-200">({course.reviews.toLocaleString()} reviews)</span>
                            </div>

                            <div className="flex items-center">
                                <Users className="h-5 w-5 mr-2" />
                                <span>{course.students.length.toLocaleString()} students</span>
                            </div>

                            <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2" />
                                <span>{Math.floor(course.totalDuration / 60)} hours total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Course Preview */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-4 mx-auto">
                                            <Play className="h-8 w-8 text-white" />
                                        </div>
                                        <p className="text-white">Course Preview Available</p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {course.whatYoullLearn.map((item, index) => (
                                        <div key={index} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Content */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Course Content • {course.syllabus.length} sections
                                </h2>

                                <div className="space-y-3">
                                    {course.syllabus.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                        >
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                    <BookOpen className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{lesson.title}</h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-gray-500">
                                                <Clock className="h-4 w-4 mr-2" />
                                                {formatDuration(lesson.duration)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Requirements */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                                <ul className="space-y-2">
                                    {course.requirements.map((req, index) => (
                                        <li key={index} className="flex items-center">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-3" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Instructor */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructor</h2>
                                <div className="flex flex-col md:flex-row items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                                            <User className="h-12 w-12 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.instructor}</h3>
                                        <p className="text-gray-600 mb-4">{course.instructorBio}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold">4.9</p>
                                                <p className="text-sm text-gray-500">Instructor Rating</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold">124K</p>
                                                <p className="text-sm text-gray-500">Students</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold">12</p>
                                                <p className="text-sm text-gray-500">Courses</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Card */}
                        <Card className="sticky top-8">
                            <CardContent className="p-6">
                                <div className="aspect-video relative mb-6">
                                    <Image
                                        src={course.thumbnail}
                                        alt={course.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline mb-2">
                                        <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                                        {course.price > 49 && (
                                            <span className="text-gray-400 line-through ml-2">
                                                ${Math.round(course.price * 1.5)}
                                            </span>
                                        )}
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-4">
                                        Enroll Now
                                    </Button>
                                    <p className="text-center text-sm text-gray-500">
                                        30-day money-back guarantee
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                                            <span>Duration</span>
                                        </div>
                                        <span className="font-medium">{Math.floor(course.totalDuration / 60)} hours</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                                            <span>Lessons</span>
                                        </div>
                                        <span className="font-medium">{course.syllabus.length}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Award className="h-5 w-5 text-gray-400 mr-2" />
                                            <span>Certificate</span>
                                        </div>
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Download className="h-5 w-5 text-gray-400 mr-2" />
                                            <span>Resources</span>
                                        </div>
                                        <span className="font-medium">{course.resources.length}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t">
                                    <h3 className="font-bold text-gray-900 mb-3">This course includes:</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            <span>Full lifetime access</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            <span>Certificate of completion</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            <span>Downloadable resources</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            <span>Mobile and TV access</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Share Course */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Share this course</h3>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Share
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        Copy Link
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Courses */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Related Courses</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                                        <div className="h-12 w-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">React Advanced Concepts</h4>
                                            <p className="text-xs text-gray-500">$79.99</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                                        <div className="h-12 w-12 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">Node.js Backend Development</h4>
                                            <p className="text-xs text-gray-500">$69.99</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}