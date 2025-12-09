
import { getCourse } from "@/services/course/getCourse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddLessonModal from "@/services/instructor/manageCourse/AddLesson";
import AddResourceModal from "@/services/instructor/manageCourse/AddResource";
import AddTagModal from "@/services/instructor/manageCourse/AddTag";

export default async function InstructorCourseDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const course = await getCourse(id);

    if (!course) return <div>No course found</div>;

    const totalDuration =
        course.syllabus?.reduce((sum: number, lesson: any) => sum + (lesson.duration || 0), 0) || 0;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-semibold">{course.title}</h1>
                    <p className="text-gray-600">{course.category}</p>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                        ${course.price}
                    </Badge>
                    <Button size="sm">Publish</Button>
                </div>
            </div>

            <Separator className="my-4" />

            {/* TABS */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-white">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="lessons">Lessons</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="tags">Tags</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* OVERVIEW */}
                <TabsContent value="overview" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-700">{course.description}</p>

                            <div className="flex flex-wrap gap-6">
                                <div>
                                    <p className="font-semibold">Category</p>
                                    <p>{course.category}</p>
                                </div>

                                <div>
                                    <p className="font-semibold">Students</p>
                                    <p>{course.students?.length || 0}</p>
                                </div>

                                <div>
                                    <p className="font-semibold">Total Duration</p>
                                    <p>{totalDuration} min</p>
                                </div>

                                <div>
                                    <p className="font-semibold">Rating</p>
                                    <p>{course.rating ?? "N/A"}</p>
                                </div>
                            </div>

                            {course.thumbnail && (
                                <div>
                                    <p className="font-semibold mb-2">Thumbnail</p>
                                    <img
                                        src={course.thumbnail}
                                        alt="Course Thumbnail"
                                        className="w-64 rounded-lg shadow border"
                                    />
                                </div>
                            )}

                            {course.introVideo && (
                                <div className="mt-4">
                                    <p className="font-semibold mb-2">Intro Video</p>
                                    <iframe
                                        className="w-full max-w-xl h-64 rounded-lg shadow"
                                        src={course.introVideo.replace("watch?v=", "embed/")}
                                        title="Intro Video"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* LESSONS */}
                <TabsContent value="lessons" className="mt-6">
                    <Card>
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle>Lessons / Modules</CardTitle>
                            <AddLessonModal courseId={course._id} />
                        </CardHeader>

                        <CardContent>
                            {course.syllabus?.length ? (
                                <ul className="space-y-2">
                                    {course.syllabus.map((lesson: any) => (
                                        <li
                                            key={lesson._id}
                                            className="flex justify-between items-center py-2 border-b"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {lesson.title} ({lesson.duration} min)
                                                </p>
                                                {lesson.videoUrl && (
                                                    <a
                                                        href={lesson.videoUrl}
                                                        target="_blank"
                                                        className="text-blue-600 text-sm"
                                                    >
                                                        Watch Video
                                                    </a>
                                                )}
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                Edit
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No lessons yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* RESOURCES */}
                <TabsContent value="resources" className="mt-6">
                    <Card>
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle>Resources</CardTitle>
                            <AddResourceModal courseId={course._id} />
                        </CardHeader>

                        <CardContent>
                            {course.resources?.length ? (
                                <ul className="space-y-3">
                                    {course.resources.map((r: any) => (
                                        <li
                                            key={r._id}
                                            className="flex justify-between items-center py-2 border-b"
                                        >
                                            <div>
                                                <p className="font-semibold">{r.title}</p>
                                                <a
                                                    href={r.link}
                                                    className="text-blue-600 text-sm"
                                                    target="_blank"
                                                >
                                                    {r.link}
                                                </a>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                Edit
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No resources yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAGS */}
                <TabsContent value="tags" className="mt-6">
                    <Card>
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle>Tags</CardTitle>
                            <AddTagModal courseId={course._id} />
                        </CardHeader>

                        <CardContent className="flex gap-3 flex-wrap">
                            {course.tags?.length ? (
                                course.tags.map((tag: string) => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                                        {tag}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-gray-500">No tags yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SETTINGS */}
                <TabsContent value="settings" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive" className="w-fit">
                                Delete Course
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
