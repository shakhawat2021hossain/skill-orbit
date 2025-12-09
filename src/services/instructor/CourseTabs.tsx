"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    BookOpen,
    FileText,
    Tag,
    BarChart3,
    Settings,
    Eye,
    Plus,
    Edit,
    Trash2,
    X,
    Play,
    Users,
    DollarSign,
    Clock,
    CheckCircle
} from "lucide-react";

interface CourseTabsProps {
    courseId: string;
}

// Mock data
const mockLessons = [
    { id: 1, title: "Introduction to Web Development", duration: 120, type: "video", status: "published" },
    { id: 2, title: "HTML & CSS Fundamentals", duration: 180, type: "video", status: "published" },
    { id: 3, title: "JavaScript Basics", duration: 240, type: "video", status: "draft" },
];

const mockResources = [
    { id: 1, title: "Course Slides PDF", type: "pdf", size: "2.4 MB", downloads: 45 },
    { id: 2, title: "Project Source Code", type: "zip", size: "15.2 MB", downloads: 32 },
];

const mockTags = ["Web Development", "JavaScript", "React"];

export default function CourseTabs({ courseId }: CourseTabsProps) {
    const [lessons, setLessons] = useState(mockLessons);
    const [resources, setResources] = useState(mockResources);
    const [tags, setTags] = useState(mockTags);
    const [newTag, setNewTag] = useState("");
    const [newLesson, setNewLesson] = useState({ title: "", duration: "", type: "video" });
    const [newResource, setNewResource] = useState({ title: "", type: "", link: "" });

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleAddLesson = () => {
        if (newLesson.title.trim()) {
            const lesson = {
                id: lessons.length + 1,
                title: newLesson.title,
                duration: parseInt(newLesson.duration) || 0,
                type: newLesson.type as "video" | "quiz" | "text",
                status: "draft" as const
            };
            setLessons([...lessons, lesson]);
            setNewLesson({ title: "", duration: "", type: "video" });
        }
    };

    const handleAddResource = () => {
        if (newResource.title.trim() && newResource.link.trim()) {
            const resource = {
                id: resources.length + 1,
                title: newResource.title,
                type: newResource.type || "link",
                size: "0 MB",
                downloads: 0
            };
            setResources([...resources, resource]);
            setNewResource({ title: "", type: "", link: "" });
        }
    };

    const handleDeleteLesson = (id: number) => {
        setLessons(lessons.filter(lesson => lesson.id !== id));
    };

    const handleDeleteResource = (id: number) => {
        setResources(resources.filter(resource => resource.id !== id));
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
    const publishedLessons = lessons.filter(lesson => lesson.status === "published").length;

    return (
        <Tabs defaultValue="lessons" className="space-y-6">
            <TabsList className="grid grid-cols-4 lg:grid-cols-6">
                <TabsTrigger value="lessons">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Lessons
                </TabsTrigger>
                <TabsTrigger value="resources">
                    <FileText className="h-4 w-4 mr-2" />
                    Resources
                </TabsTrigger>
                <TabsTrigger value="tags">
                    <Tag className="h-4 w-4 mr-2" />
                    Tags
                </TabsTrigger>
                <TabsTrigger value="analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                </TabsTrigger>
                <TabsTrigger value="settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                </TabsTrigger>
                <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                </TabsTrigger>
            </TabsList>

            {/* Lessons Tab */}
            <TabsContent value="lessons">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Course Lessons</h2>
                                <p className="text-muted-foreground">
                                    {publishedLessons} published, {lessons.length - publishedLessons} draft • Total duration: {formatDuration(totalDuration)}
                                </p>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Lesson
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Lesson</DialogTitle>
                                        <DialogDescription>
                                            Create a new lesson for your course.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Lesson Title</label>
                                            <Input
                                                placeholder="Enter lesson title"
                                                value={newLesson.title}
                                                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Duration (minutes)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter duration in minutes"
                                                value={newLesson.duration}
                                                onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Lesson Type</label>
                                            <select
                                                className="w-full px-3 py-2 border rounded-md"
                                                value={newLesson.type}
                                                onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value })}
                                            >
                                                <option value="video">Video</option>
                                                <option value="quiz">Quiz</option>
                                                <option value="text">Text/Article</option>
                                            </select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleAddLesson}>Add Lesson</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lessons.map((lesson) => (
                                        <TableRow key={lesson.id}>
                                            <TableCell className="font-medium">{lesson.title}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{formatDuration(lesson.duration)}</TableCell>
                                            <TableCell>
                                                <Badge variant={lesson.status === 'published' ? 'default' : 'secondary'}>
                                                    {lesson.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="outline">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleDeleteLesson(lesson.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Course Resources</h2>
                                <p className="text-muted-foreground">
                                    {resources.length} resources available for download
                                </p>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Resource
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Resource</DialogTitle>
                                        <DialogDescription>
                                            Add downloadable resources for your students.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Resource Title</label>
                                            <Input
                                                placeholder="Enter resource title"
                                                value={newResource.title}
                                                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Resource Type</label>
                                            <Input
                                                placeholder="e.g., PDF, ZIP, DOC"
                                                value={newResource.type}
                                                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Resource Link</label>
                                            <Input
                                                placeholder="https://example.com/resource.pdf"
                                                value={newResource.link}
                                                onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleAddResource}>Add Resource</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map((resource) => (
                                <Card key={resource.id} className="relative">
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                <div className="p-2 bg-blue-50 rounded">
                                                    <FileText className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{resource.title}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {resource.type.toUpperCase()} • {resource.size} • {resource.downloads} downloads
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDeleteResource(resource.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Tags Tab */}
            <TabsContent value="tags">
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Course Tags</h2>

                        <div className="mb-6">
                            <div className="flex gap-2 mb-4">
                                <Input
                                    placeholder="Add a new tag"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                />
                                <Button onClick={handleAddTag}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 hover:text-red-500"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Course Analytics</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">124</p>
                                            <p className="text-sm text-muted-foreground">Total Enrollments</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">$9,918.76</p>
                                            <p className="text-sm text-muted-foreground">Total Revenue</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">85%</p>
                                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">4.7</p>
                                            <p className="text-sm text-muted-foreground">Average Rating</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold mb-3">Recent Activity</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">New student enrolled</span>
                                        <span className="text-sm text-muted-foreground">2 hours ago</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Course rated 5 stars</span>
                                        <span className="text-sm text-muted-foreground">1 day ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Course Settings</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-3">General Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Course Status</label>
                                        <select className="w-full px-3 py-2 border rounded-md mt-1">
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Price ($)</label>
                                        <Input type="number" defaultValue={79.99} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h3 className="font-semibold mb-3">Danger Zone</h3>
                                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-red-800">Delete this course</h4>
                                            <p className="text-sm text-red-600">
                                                Once deleted, this course cannot be recovered.
                                            </p>
                                        </div>
                                        <Button variant="destructive">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete Course
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview">
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Student Preview</h2>
                        <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                            <div className="text-white text-center">
                                <Play className="h-16 w-16 mx-auto mb-4" />
                                <p>Course Preview Video</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">Course Preview</h3>
                                <p className="text-muted-foreground">This is how students see your course</p>
                            </div>
                            <Button>
                                <Eye className="h-4 w-4 mr-2" />
                                View Full Preview
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}