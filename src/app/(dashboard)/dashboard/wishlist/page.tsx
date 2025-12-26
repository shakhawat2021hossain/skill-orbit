import { getWishlist } from '@/services/wishlist/getWishlist';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
    MoreVertical,
    Play,
    Eye,
    Trash2,
    Clock,
    DollarSign,
    Users,
    Bookmark
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { removeFromWishlistAction } from '@/services/wishlist/removeFromWishlist';
import { RemoveWishlistButton } from '@/components/modules/wishlist/RemoveWishlist';

const WishlistPage = async () => {
    const wishlistedCourses = await getWishlist();

    if (!wishlistedCourses || wishlistedCourses.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                            <Bookmark className="h-12 w-12 text-blue-600" />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">Your wishlist is empty</h2>
                        <p className="mt-2 text-gray-600">
                            Courses you save will appear here
                        </p>
                        <div className="mt-8">
                            <Button asChild>
                                <Link href="/courses">
                                    Browse Courses
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                            <p className="mt-2 text-gray-600">
                                {wishlistedCourses.length} saved course{wishlistedCourses.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/courses">
                                Browse More Courses
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-lg border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="w-[400px]">Course</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {wishlistedCourses.map((course) => (
                                <TableRow key={course._id} className="hover:bg-gray-50">
                                    {/* Course Info */}
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
                                                <Image
                                                    src={course.thumbnail as string}
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/courses/${course._id}`}
                                                    className="font-semibold text-gray-900 hover:text-blue-600 truncate block"
                                                >
                                                    {course.title}
                                                </Link>

                                                <div className="flex items-center mt-2 space-x-2">
                                                    <Badge variant="secondary" className="text-xs">
                                                        {course.isPublished ? 'Published' : 'Draft'}
                                                    </Badge>
                                                    <span className="text-xs text-gray-500">
                                                        Added: {formatDate(course.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Instructor */}
                                    <TableCell>
                                        <div className="text-sm font-medium text-gray-900">
                                            {course.instructor}
                                        </div>
                                    </TableCell>

                                    {/* Category */}
                                    <TableCell>
                                        <Badge variant="outline">
                                            {course.category}
                                        </Badge>
                                    </TableCell>

                                    {/* Duration */}
                                    <TableCell>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-2" />
                                            {formatDuration(course.totalDuration as number)}
                                        </div>
                                    </TableCell>

                                    {/* Students */}
                                    <TableCell>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users className="h-4 w-4 mr-2" />
                                            {course.students?.length || 0} enrolled
                                        </div>
                                    </TableCell>

                                    {/* Price */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end text-sm font-semibold text-gray-900">
                                            <DollarSign className="h-4 w-4" />
                                            {course.price.toFixed(2)}
                                        </div>
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end space-x-2">

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="sm" variant="ghost">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/courses/${course._id}`}
                                                            className="cursor-pointer flex items-center"
                                                        >
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {course.introVideo && (
                                                        <DropdownMenuItem asChild>
                                                            <a
                                                                href={course.introVideo}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="cursor-pointer flex items-center"
                                                            >
                                                                <Play className="h-4 w-4 mr-2" />
                                                                Watch Intro
                                                            </a>
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem asChild>
                                                        <RemoveWishlistButton courseId={course._id} />
                                                    </DropdownMenuItem>


                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>


            </div>
        </div>
    );
};

export default WishlistPage;