import { getCourse } from "@/services/course/getCourse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AddLessonModal from "@/components/dashboard/instructor/manageCourse/AddLesson";
import AddResourceModal from "@/components/dashboard/instructor/manageCourse/AddResource";
import AddTagModal from "@/components/dashboard/instructor/manageCourse/AddTag";
import {
    FileText,
    Video,
    Tag,
    Settings,
    BookOpen,
    ExternalLink,
    Edit2,
    Trash2,
    PlayCircle,
    X,
    Pencil
} from "lucide-react";
import CourseStats from "@/components/dashboard/instructor/manageCourse/CourseStats";
import LessonsData from "@/components/dashboard/instructor/manageCourse/LessonsData";
import EditCourseModal from "@/components/dashboard/instructor/EditCourseModal";

export default async function InstructorCourseDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const course = await getCourse(id);



    if (!course) return <div>No course found</div>;



    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
            {/* HEADER */}
            <CourseStats course={course} />

            {/* TABS */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-white border rounded-lg p-1 w-full md:w-auto">
                    <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50">
                        <BookOpen className="h-4 w-4" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="lessons" className="gap-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50">
                        <Video className="h-4 w-4" />
                        Lessons
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="gap-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50">
                        <FileText className="h-4 w-4" />
                        Resources
                    </TabsTrigger>
                    <TabsTrigger value="tags" className="gap-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50">
                        <Tag className="h-4 w-4" />
                        Tags
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50">
                        <Settings className="h-4 w-4" />
                        Settings
                    </TabsTrigger>
                </TabsList>

                {/* OVERVIEW */}
                <TabsContent value="overview" className="mt-6 space-y-6 animate-in fade-in duration-300">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-blue-600" />
                                    Course Overview
                                </CardTitle>
                                <CardDescription>
                                    View and manage course details
                                </CardDescription>
                            </div>

                            {/* Add Edit Button Here */}
                            <EditCourseModal course={course}>
                                <Button size="sm" className="gap-2">
                                    <Pencil className="h-4 w-4" />
                                    Edit Course
                                </Button>
                            </EditCourseModal>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Thumbnail */}
                                {course.thumbnail && (
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            Course Thumbnail
                                        </h3>
                                        <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-md">
                                            <img
                                                src={course.thumbnail}
                                                alt="Course Thumbnail"
                                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                                        </div>
                                    </div>
                                )}

                                {/* Intro Video */}
                                {course.introVideo && (
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                            <PlayCircle className="h-5 w-5" />
                                            Introduction Video
                                        </h3>
                                        <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-md">
                                            <iframe
                                                className="w-full h-48"
                                                src={course.introVideo.replace("watch?v=", "embed/")}
                                                title="Intro Video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Syllabus Preview */}
                            {course.syllabus && course.syllabus.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-gray-700">Course Syllabus ({course.syllabus.length} modules)</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {course.syllabus.slice(0, 8).map((lesson: any, index: number) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                    <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-medium text-sm truncate">{lesson.title}</p>
                                                    {lesson.duration && (
                                                        <p className="text-xs text-gray-500">{lesson.duration} min</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* LESSONS */}
                <TabsContent value="lessons" className="mt-6 animate-in fade-in duration-300">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3">
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Video className="h-5 w-5" />
                                    Course Lessons
                                </CardTitle>
                                <CardDescription>
                                    Manage your course content and modules
                                </CardDescription>
                            </div>
                            <AddLessonModal courseId={course._id} />
                        </CardHeader>
                        <LessonsData course={course} />
                    </Card>
                </TabsContent>

                {/* RESOURCES */}
                <TabsContent value="resources" className="mt-6 animate-in fade-in duration-300">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3">
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Course Resources
                                </CardTitle>
                                <CardDescription>
                                    Supplementary materials for your students
                                </CardDescription>
                            </div>
                            <AddResourceModal courseId={course._id} />
                        </CardHeader>
                        <CardContent>
                            {course.resources?.length ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.resources.map((resource: any) => (
                                        <div
                                            key={resource._id}
                                            className="group p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                                                        <FileText className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                                                        <p className="text-sm text-gray-500 truncate max-w-[200px]">
                                                            {resource.link}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                                        <Edit2 className="h-3 w-3" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <a
                                                    href={resource.link}
                                                    target="_blank"
                                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    Open Resource
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Resources Yet</h3>
                                    <p className="text-gray-500 mb-6">Add helpful resources like PDFs, links, or code files</p>
                                    <AddResourceModal courseId={course._id} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAGS */}
                <TabsContent value="tags" className="mt-6 animate-in fade-in duration-300">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3">
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Course Tags
                                </CardTitle>
                                <CardDescription>
                                    Tags help students discover your course
                                </CardDescription>
                            </div>
                            <AddTagModal courseId={course._id} />
                        </CardHeader>
                        <CardContent>
                            {course.tags?.length ? (
                                <div className="flex flex-wrap gap-3">
                                    {course.tags.map((tag: string, index: number) => (
                                        <div key={index} className="group relative">
                                            <Badge
                                                variant="secondary"
                                                className="px-4 py-2 text-sm rounded-full bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-300 transition-colors group-hover:pr-8"
                                            >
                                                {tag}
                                            </Badge>
                                            <button className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Tag className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Tags Yet</h3>
                                    <p className="text-gray-500 mb-6">Add relevant tags to improve discoverability</p>
                                    <AddTagModal courseId={course._id} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SETTINGS */}
                <TabsContent value="settings" className="mt-6 animate-in fade-in duration-300">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Course Settings
                            </CardTitle>
                            <CardDescription>Manage your course configuration</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="p-4 border border-red-200 rounded-xl bg-red-50">
                                    <h3 className="font-semibold text-red-800 mb-2">Danger Zone</h3>
                                    <p className="text-sm text-red-600 mb-4">
                                        Once you delete a course, there is no going back. Please be certain.
                                    </p>
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                                            Archive Course
                                        </Button>
                                        <Button variant="destructive" size="sm" className="gap-2">
                                            <Trash2 className="h-4 w-4" />
                                            Delete Course
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}