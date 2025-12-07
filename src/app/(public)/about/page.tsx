import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Users,
    Globe,
    Award,
    Target,
    Heart,
    CheckCircle,
    Star,
    TrendingUp
} from "lucide-react";
import Link from "next/link";

const stats = [
    { icon: Users, value: "1.2M+", label: "Students Worldwide", color: "bg-blue-500" },
    { icon: BookOpen, value: "5,000+", label: "Courses Available", color: "bg-green-500" },
    { icon: Globe, value: "190+", label: "Countries Reached", color: "bg-purple-500" },
    { icon: Award, value: "98%", label: "Satisfaction Rate", color: "bg-orange-500" },
];

const values = [
    {
        icon: Target,
        title: "Our Mission",
        description: "To make quality education accessible and affordable for everyone, everywhere.",
    },
    {
        icon: Heart,
        title: "Our Vision",
        description: "A world where anyone can learn the skills they need to transform their life and career.",
    },
    {
        icon: Star,
        title: "Our Values",
        description: "Excellence, innovation, accessibility, and student success drive everything we do.",
    },
];

const team = [
    {
        name: "Sarah Johnson",
        role: "CEO & Founder",
        bio: "Former educator with 10+ years in EdTech",
        imageColor: "bg-blue-100",
    },
    {
        name: "Michael Chen",
        role: "CTO",
        bio: "Tech innovator specializing in learning platforms",
        imageColor: "bg-green-100",
    },
    {
        name: "Emma Wilson",
        role: "Head of Content",
        bio: "Curriculum developer and education expert",
        imageColor: "bg-purple-100",
    },
    {
        name: "David Park",
        role: "Student Success",
        bio: "Dedicated to helping learners achieve their goals",
        imageColor: "bg-orange-100",
    },
];

const milestones = [
    { year: "2020", title: "Founded", description: "skillorbit was born with a vision to democratize education" },
    { year: "2021", title: "First 100K Students", description: "Reached our first major milestone in student enrollment" },
    { year: "2022", title: "Mobile App Launch", description: "Released our iOS and Android learning apps" },
    { year: "2023", title: "Global Expansion", description: "Expanded to serve learners in 190+ countries" },
    { year: "2024", title: "AI Learning", description: "Introduced AI-powered personalized learning paths" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-linear-to-r from-blue-200 to-purple-200 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About skillorbit</h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8">
                        We're on a mission to make quality education accessible to everyone,
                        helping learners worldwide transform their careers and lives.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild className="bg-blue-50 text-blue-600 hover:bg-blue-50">
                            <Link href="/courses">Browse Courses</Link>
                        </Button>
                        <Button variant="outline" className=" border-white hover:bg-white/10">
                            Join Our Team
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Stats */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Card key={index} className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                                            <stat.icon className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                            <p className="text-gray-600">{stat.label}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Mission & Values */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We believe education should be accessible, engaging, and transformative
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="border hover:shadow-lg transition-shadow">
                                <CardContent className="p-8 text-center">
                                    <div className="inline-flex p-4 bg-blue-50 rounded-full mb-6">
                                        <value.icon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Our Story */}
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    Founded in 2020, skillorbit began with a simple idea: quality education should be
                                    accessible to everyone, regardless of location or background.
                                </p>
                                <p>
                                    What started as a small team of educators and technologists has grown into a global
                                    platform serving millions of learners across 190+ countries.
                                </p>
                                <p>
                                    Today, we partner with top universities and industry leaders to bring the world's
                                    best learning experiences to students everywhere.
                                </p>
                            </div>
                            <div className="mt-8">
                                <Button asChild className="bg-linear-to-r from-blue-600 to-purple-600">
                                    <Link href="/courses">Start Learning Today</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold">Why Choose skillorbit?</h3>
                                    {[
                                        "Industry-recognized certificates",
                                        "Learn from expert instructors",
                                        "Flexible, self-paced learning",
                                        "Hands-on projects & exercises",
                                        "24/7 learning support",
                                        "Career advancement focus",
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Passionate educators and innovators dedicated to your learning success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className={`h-20 w-20 rounded-full mx-auto mb-4 flex items-center justify-center ${member.imageColor}`}>
                                        <span className="text-2xl font-bold text-gray-700">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                                    <p className="text-blue-600 mb-2">{member.role}</p>
                                    <p className="text-sm text-gray-600">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                
            </div>
        </div>
    );
}