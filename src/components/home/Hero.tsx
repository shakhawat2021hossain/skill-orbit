import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Check, Users, Award, Star, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-white to-blue-50/30">
            {/* Grid Pattern Background */}

            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                                        linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                        linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                                        `,
                    backgroundSize: '20px 20px'
                }}
            />


            <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                {/* Rest of your Hero content remains the same */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-blue-700">Rated 4.9/5 by 12K+ learners</span>
                        </div>

                        {/* Headline */}
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                                <span className="block">Advance Your</span>
                                <span className="block bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Career with Skills
                                </span>
                            </h1>

                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Learn in-demand skills from industry experts. 5,000+ courses, hands-on projects,
                                and career certificates to help you succeed in today's job market.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
                                asChild
                            >
                                <Link href="/courses">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="px-8 py-6 rounded-xl text-base font-semibold border-2 hover:bg-blue-50"
                                asChild
                            >
                                <Link href="/demo">
                                    <div className="flex items-center">
                                        <Play className="h-5 w-5 text-blue-600 mr-2" />
                                        Watch Demo
                                    </div>
                                </Link>
                            </Button>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4">
                            {[
                                "Certificate upon completion",
                                "7-day money-back guarantee",
                                "24/7 learning support"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="p-1 bg-green-100 rounded-full">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="relative">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">1.2M+</div>
                                        <div className="text-sm text-gray-500">Active Learners</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-100 rounded-xl">
                                        <BookOpen className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">5K+</div>
                                        <div className="text-sm text-gray-500">Courses</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <Award className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">98%</div>
                                        <div className="text-sm text-gray-500">Satisfaction</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-100 rounded-xl">
                                        <Award className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">85%</div>
                                        <div className="text-sm text-gray-500">Career Growth</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Featured Course Card */}
                        <div className="bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl p-1">
                            <div className="bg-white rounded-2xl p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <Badge className="bg-linear-to-r from-blue-500 to-purple-500 text-white">
                                        Featured Course
                                    </Badge>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                        <span className="font-medium">4.9</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Complete Web Development Bootcamp 2024
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Master modern web development with React, Node.js, and MongoDB
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">42 hours • Beginner to Advanced</div>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Preview
                                    </Button>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </section>
    );
}