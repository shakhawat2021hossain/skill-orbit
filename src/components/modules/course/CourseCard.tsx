"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { addToWishlist } from '@/services/wishlist/addToWishlist';
import { ICourse } from '@/types/course';
import { ArrowRight, Bookmark, Clock, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CourseCard = ({ course }: { course: ICourse }) => {

    const router = useRouter(

    )
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        return `${hours}h`;
    };
    const handleAddToWishlist = async(id: string) => {
        try{
            const abc = await addToWishlist(id)
            console.log(abc)
            router.refresh()
            toast.success("Added to wishlist!")
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200">
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
                    <Button onClick={() => handleAddToWishlist(course._id)} size="icon" variant="ghost" className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white">
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
    );
};

export default CourseCard;