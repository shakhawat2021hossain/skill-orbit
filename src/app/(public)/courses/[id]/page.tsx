import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Clock,
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
import { getCourse } from "@/services/course/getCourse";
import EnrollButton from "@/components/modules/course/EnrollButton";
import { getReviews } from "@/services/review/getReview";


// Mock whatYoullLearn data since not in your JSON
const mockWhatYoullLearn = [
    "Build full-stack web applications",
    "Understand modern JavaScript frameworks",
    "Work with databases and APIs",
    "Deploy applications to production",
    "Follow best practices and coding standards",
    "Create responsive web designs",
];

// Mock requirements data since not in your JSON
const mockRequirements = [
    "Basic computer knowledge",
    "No programming experience required",
    "Internet connection",
    "Modern web browser",
];

function extractYouTubeId(url: string) {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^\s&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
}

export default async function CourseDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const course = await getCourse(id);
    const reviews = await getReviews(id);

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

    const totalHours = 8;
    const lessonCount = course.syllabus?.length || 0;


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Course Hero */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl">
                        <Badge className="mb-4 bg-white text-blue-600">
                            {course.category}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {course.title}
                        </h1>
                        <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-6">
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
                                <Clock className="h-5 w-5 mr-2" />
                                <span>{totalHours} hours total</span>
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
                                    {course.introVideo && (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${extractYouTubeId(course.introVideo)}`}
                                            className="w-full h-full rounded-lg"
                                            allowFullScreen
                                        />
                                    )}
                                </div>


                                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {mockWhatYoullLearn.map((item, index) => (
                                        <div key={index} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Content */}
                        {
                            course.syllabus && course.syllabus.length > 0 &&
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Course Content • {lessonCount} sections
                                    </h2>

                                    <div className="space-y-3">
                                        {course?.syllabus.map((lesson) => (
                                            <div
                                                key={lesson._id}
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
                                                    {formatDuration(lesson?.duration || 6)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        }

                        {/* Requirements */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                                <ul className="space-y-2">
                                    {mockRequirements.map((req, index) => (
                                        <li key={index} className="flex items-center">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-3" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Reviews Section */}
                        {
                            reviews &&
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Student Reviews
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {reviews.length} reviews
                                            </p>
                                        </div>

                                        {/* Optional: show only if enrolled & completed */}
                                        {/* <ReviewModal courseId={course._id} /> */}
                                    </div>

                                    {/* Average Rating */}
                                    {course.rating && (
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="text-4xl font-bold">
                                                {course.rating.average.toFixed(1)}
                                            </div>
                                            <div>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            className={`text-xl ${star <= Math.round(course.rating.average)
                                                                ? "text-yellow-400"
                                                                : "text-gray-300"
                                                                }`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Based on {course.rating.count} reviews
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Review List */}
                                    <div className="space-y-6">
                                        {reviews.length === 0 ? (
                                            <p className="text-gray-500">
                                                No reviews yet. Be the first to review this course.
                                            </p>
                                        ) : (
                                            reviews.map((review) => (
                                                <div
                                                    key={review._id}
                                                    className="border rounded-lg p-4"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <User className="h-4 w-4 text-blue-600" />
                                                            </div>
                                                            <span className="font-medium">
                                                                {review.reviewer || "Student"}
                                                            </span>
                                                        </div>

                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <span
                                                                    key={star}
                                                                    className={`text-sm ${star <= review.rating
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-300"
                                                                        }`}
                                                                >
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {review.review && (
                                                        <p className="text-gray-700 text-sm">
                                                            {review.review}
                                                        </p>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        }


                        {/* Tags */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {course?.tags?.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-sm">
                                            {tag}
                                        </Badge>
                                    ))}
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
                                        src={course?.thumbnail as string || "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop"}
                                        alt={course?.title || "image"}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline mb-2">
                                        <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                                    </div>
                                    <EnrollButton courseId={course._id} />
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
                                        <span className="font-medium">{totalHours} hours</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                                            <span>Lessons</span>
                                        </div>
                                        <span className="font-medium">{lessonCount}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Award className="h-5 w-5 text-gray-400 mr-2" />
                                            <span>Certificate</span>
                                        </div>
                                        <CheckCircle className="h-5 w-5 text-green-500" />
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

                        {/* Back to Courses */}
                        <Card>
                            <CardContent className="p-6">
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/courses">
                                        <BookOpen className="h-4 w-4 mr-2" />
                                        Browse All Courses
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}