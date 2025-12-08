"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, DollarSign, User, Save, FileText, Tag } from "lucide-react";
import { addCourse } from "@/services/course/addCourse";
import { Category, type CourseFormData, courseSchema } from "@/types/course";

export default function CreateCourse() {
    const router = useRouter();

    const form = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category: Category.WEB_DEVELOPMENT,
            instructor: ""
        },
    });

    const [state, formAction, isPending] = useActionState(addCourse, {
        success: false,
        message: "",
        errors: {}
    });

    useEffect(() => {
        if (state.success) {
            toast.success("Course created successfully!");
            router.push("/dashboard/instructor/courses");
        } else if (state.message && !state.success) {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard/instructor/courses">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Courses
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-gray-300" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
                                <p className="text-gray-600 mt-1">Start building your course with the details below</p>
                            </div>
                        </div>

                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Draft
                        </Badge>
                    </div>
                </div>

                <Card className="border shadow-sm mx-20">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl">Course Details</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form action={formAction} className="space-y-8">
                                {/* Title */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">Course Title</FormLabel>
                                            <FormDescription className="mb-2">
                                                Choose a clear and descriptive title for your course
                                            </FormDescription>
                                            <FormControl>
                                                <div className="relative">
                                                    <BookOpen className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                    <Input
                                                        placeholder="e.g., Complete Web Development Bootcamp 2024"
                                                        className="pl-10 h-12 text-base"
                                                        {...field}
                                                        disabled={isPending}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">Course Description</FormLabel>
                                            <FormDescription className="mb-2">
                                                Describe what students will learn and achieve
                                            </FormDescription>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="In this course, you will learn..."
                                                    className="min-h-[120px] text-base p-4"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Price */}
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base font-medium">Price</FormLabel>
                                                <FormDescription className="mb-2">
                                                    Set the course price in USD
                                                </FormDescription>
                                                <FormControl>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                        <Input
                                                            type="number"
                                                            placeholder="0.00"
                                                            className="pl-10 h-12"
                                                            {...field}
                                                            disabled={isPending}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-red-600" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Category */}
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base font-medium">Category</FormLabel>
                                                <FormDescription className="mb-2">
                                                    Select the most relevant category
                                                </FormDescription>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12">
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(Category).map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-600" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Instructor */}
                                <FormField
                                    control={form.control}
                                    name="instructor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium">Instructor</FormLabel>
                                            <FormDescription className="mb-2">
                                                Your name or the main instructor's name
                                            </FormDescription>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                    <Input
                                                        placeholder="Enter instructor name"
                                                        className="pl-10 h-12"
                                                        {...field}
                                                        disabled={isPending}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <div className="pt-6 border-t">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 text-base"
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                                                    Creating Course...
                                                </div>
                                            ) : (
                                                <>
                                                    <Save className="h-5 w-5 mr-2" />
                                                    Publish Course
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-12"
                                            onClick={() => router.back()}
                                            disabled={isPending}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}