import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Play, Users, DollarSign, ArrowRight } from "lucide-react";
import { ICourse } from "@/types/course";
import Link from "next/link";

interface CourseCardProps {
    course: ICourse;
}

export default function CourseCard({ course }: CourseCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
            {/* Course Thumbnail */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {course.introVideo && (
                    <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">
                        <Play className="h-3 w-3 mr-1" />
                        Video Intro
                    </Badge>
                )}
                <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="font-semibold">
                        ${course.price}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                            {getInitials(course.instructor)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{course.instructor}</span>
                </div>
            </CardHeader>

            <CardContent className="pb-3 grow">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {course.description}
                </p>
                <Badge variant="outline">{course.category}</Badge>

                {/* Course Stats */}
                <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students?.length || 0} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>
                            {/* ${course.revenue || 0} */}
                            $ 30

                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-0">
                <Button
                    asChild
                    className="w-full"
                    variant="default"
                >
                    <Link href={`/instructor/dashboard/courses/${course._id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
} 