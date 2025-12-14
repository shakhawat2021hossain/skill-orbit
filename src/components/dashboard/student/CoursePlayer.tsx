"use client";

import { IMyCourseDetails } from "@/types/course";
import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  BookOpen,
  Menu,
  X,
  Maximize2,
  ListOrdered,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { updateProgress } from "@/services/course/enrollCourse";

function extractYouTubeId(url: string) {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^\s&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
}

export default function CoursePlayer({ course, enrollment }: IMyCourseDetails) {
    const lessons = course.syllabus || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(
        new Set(enrollment.completedLessons || [])
    );

    if (!lessons.length) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-center">
                    <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h1 className="text-xl font-semibold text-gray-700">No lessons available</h1>
                </div>
            </div>
        );
    }

    const currentLesson = lessons[currentIndex];
    
    useEffect(() => {
        const lessonId = currentLesson._id;
        if (!completedLessons.has(lessonId)) {
            markAsComplete(lessonId);
        }
    }, [currentLesson._id]);

    const completionPercent = Math.round((completedLessons.size / lessons.length) * 100);

    // MARK LESSON COMPLETE (local + server)
    const markAsComplete = async (lessonId: string) => {
        if (completedLessons.has(lessonId)) return;

        setCompletedLessons((prev) => new Set(prev).add(lessonId));

        try {
            const updated = await updateProgress(course._id, lessonId);
            if (!updated) console.error("Failed to update progress on server");
        } catch (err) {
            console.error("Error updating progress:", err);
        }
    };

    const goNext = () => {
        // Mark current lesson as complete
        markAsComplete(currentLesson._id);

        // Move to next lesson only if not last
        if (currentIndex < lessons.length - 1) {
            setCurrentIndex((i) => i + 1);
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    };

    const formatDuration = (minutes?: number) => {
        if (!minutes) return "N/A";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return h ? `${h}h ${m}m` : `${m}m`;
    };

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
                <div className="px-4">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                            
                            <div className="max-w-xl">
                                <h1 className="font-semibold text-gray-900 text-sm truncate">{course.title}</h1>
                                <div className="text-xs text-gray-500 flex items-center gap-2">
                                    <span>Lesson {currentIndex + 1} of {lessons.length}</span>
                                    <span>•</span>
                                    <span>{completionPercent}% Complete</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-3">
                                <Progress value={completionPercent} className="w-24 h-2" />
                                <span className="text-sm text-gray-600">{completedLessons.size}/{lessons.length}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    const iframe = document.querySelector('iframe');
                                    if (iframe?.requestFullscreen) {
                                        iframe.requestFullscreen();
                                    }
                                }}
                            >
                                <Maximize2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-[calc(100vh-56px)]">
                {/* Main Video Player Area */}
                <div className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:w-8/12' : 'w-full'} transition-all duration-300`}>
                    {/* Video Container */}
                    <div className="flex-1 bg-black relative overflow-hidden">
                        <iframe
                            key={currentLesson._id}
                            src={`https://www.youtube.com/embed/${extractYouTubeId(currentLesson.videoUrl as string)}?autoplay=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={currentLesson.title}
                        />
                    </div>

                    {/* Lesson Info & Navigation */}
                    <div className="bg-white border-t border-gray-200">
                        <div className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="font-semibold text-gray-900">{currentLesson.title}</h2>
                                        <Badge variant="outline" className="text-xs">
                                            {formatDuration(currentLesson.duration)}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`gap-2 ${completedLessons.has(currentLesson._id) ? 'text-green-600 border-green-200 bg-green-50' : ''}`}
                                            onClick={() => markAsComplete(currentLesson._id)}
                                        >
                                            <CheckCircle className={`h-4 w-4 ${completedLessons.has(currentLesson._id) ? 'text-green-600' : 'text-gray-400'}`} />
                                            {completedLessons.has(currentLesson._id) ? 'Completed' : 'Mark Complete'}
                                        </Button>
                                        <span className="text-sm text-gray-500">
                                            {currentIndex + 1} of {lessons.length} lessons
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={goPrev}
                                        disabled={currentIndex === 0}
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </Button>
                                    <Button
                                        onClick={goNext}
                                        disabled={currentIndex === lessons.length - 1}
                                        className="gap-2 bg-blue-600 hover:bg-blue-700"
                                    >
                                        Next Lesson
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Lessons List */}
                {sidebarOpen && (
                    <div className="w-full lg:w-4/12 border-l border-gray-200 bg-white flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ListOrdered className="h-5 w-5 text-gray-600" />
                                    <h3 className="font-semibold text-gray-900">Course Content</h3>
                                </div>
                                <Badge variant="secondary">
                                    {lessons.length} lessons
                                </Badge>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2">
                            <div className="space-y-1">
                                {lessons.map((lesson, index) => {
                                    const isActive = index === currentIndex;
                                    const isCompleted = completedLessons.has(lesson._id);

                                    return (
                                        <button
                                            key={lesson._id}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3
                                                ${isActive 
                                                    ? 'bg-blue-50 border border-blue-200' 
                                                    : 'hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            <div className="flex-shrink-0">
                                                <div className={`h-8 w-8 rounded-md flex items-center justify-center
                                                    ${isActive ? 'bg-blue-600 text-white' : 
                                                      isCompleted ? 'bg-green-100 text-green-600' : 
                                                      'bg-gray-100 text-gray-600'
                                                    }
                                                `}>
                                                    {isCompleted ? (
                                                        <CheckCircle className="h-4 w-4" />
                                                    ) : (
                                                        <span className="text-sm font-medium">{index + 1}</span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className={`font-medium text-sm truncate ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                                                        {lesson.title}
                                                    </h4>
                                                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                                        {formatDuration(lesson.duration)}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Progress Summary */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Your Progress</span>
                                    <span className="font-semibold text-gray-900">{completionPercent}%</span>
                                </div>
                                <Progress value={completionPercent} className="h-2" />
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>Completed: {completedLessons.size}</span>
                                    <span>Remaining: {lessons.length - completedLessons.size}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Toggle Button for Mobile */}
            {!sidebarOpen && (
                <Button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed bottom-4 right-4 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white lg:hidden"
                    size="icon"
                >
                    <ListOrdered className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
}