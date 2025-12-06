import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock courses data based on your schema
const courses = [
    {
        _id: "1",
        title: "Complete Web Development Bootcamp",
        description: "Learn full-stack web development with React, Node.js, MongoDB, and modern tools.",
        price: 89.99,
        category: "Web Development",
        instructor: "Sarah Johnson",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
        tags: ["React", "Node.js", "MongoDB"],
        totalDuration: 2520, // 42 hours in minutes
        students: Array(45000).fill(""),
        rating: 4.9,
    },
    {
        _id: "2",
        title: "Python & Data Science Masterclass",
        description: "Master Python programming, data analysis, and machine learning with hands-on projects.",
        price: 99.99,
        category: "Data Science",
        instructor: "Dr. Michael Chen",
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
        tags: ["Python", "Machine Learning", "Data"],
        totalDuration: 3360, // 56 hours
        students: Array(32000).fill(""),
        rating: 4.8,
    },
    {
        _id: "3",
        title: "UI/UX Design Fundamentals",
        description: "Learn user-centered design principles, wireframing, and prototyping.",
        price: 79.99,
        category: "Design",
        instructor: "Emma Wilson",
        thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
        tags: ["Figma", "UX Research", "Design"],
        totalDuration: 2160, // 36 hours
        students: Array(28000).fill(""),
        rating: 4.7,
    },
    {
        _id: "4",
        title: "Digital Marketing Strategy",
        description: "Comprehensive guide to digital marketing including SEO and social media.",
        price: 69.99,
        category: "Marketing",
        instructor: "Alex Rodriguez",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
        tags: ["SEO", "Social Media", "Marketing"],
        totalDuration: 1680, // 28 hours
        students: Array(35000).fill(""),
        rating: 4.6,
    },
    {
        _id: "5",
        title: "React Native Mobile Development",
        description: "Build cross-platform mobile applications with React Native and Expo.",
        price: 94.99,
        category: "Mobile Development",
        instructor: "James Miller",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop",
        tags: ["React Native", "Mobile", "JavaScript"],
        totalDuration: 2280, // 38 hours
        students: Array(29000).fill(""),
        rating: 4.9,
    },
    {
        _id: "6",
        title: "Cloud Computing with AWS",
        description: "Master AWS services including EC2, S3, Lambda, and RDS.",
        price: 109.99,
        category: "Cloud Computing",
        instructor: "Lisa Taylor",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
        tags: ["AWS", "Cloud", "DevOps"],
        totalDuration: 2640, // 44 hours
        students: Array(27000).fill(""),
        rating: 4.8,
    },
];

export default function CoursesPage() {
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        return `${hours} hours`;
    };

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
                            {courses.length} Courses Available
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
                    {courses.map((course) => (
                        <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Course Image */}
                            <div className="relative h-48">
                                <Image
                                    src={course.thumbnail}
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
                                        {formatDuration(course.totalDuration)}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-1" />
                                        {course.students.length.toLocaleString()} students
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                        {course.rating}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course.tags.map((tag) => (
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
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border">
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