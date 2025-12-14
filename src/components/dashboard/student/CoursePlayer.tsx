"use client";

import { IMyCourseDetails } from "@/types/course";
import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Clock,
    BookOpen,
    Menu,
    X,
    Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function extractYouTubeId(url: string) {
    const regExp =
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^\s&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
}

export default function CoursePlayer({ course }: IMyCourseDetails) {
    const lessons = course.syllabus;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(
        new Set()
    );

    if (!lessons?.length) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
                <BookOpen className="h-14 w-14 text-gray-500" />
            </div>
        );
    }

    const currentLesson = lessons[currentIndex];

    const completionPercent = Math.round(
        (completedLessons.size / lessons.length) * 100
    );

    const goNext = () => {
        if (currentIndex < lessons.length - 1) {
            markAsComplete(currentLesson._id);
            setCurrentIndex((i) => i + 1);
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    };

    const markAsComplete = (lessonId: string) => {
        setCompletedLessons((prev) => new Set(prev).add(lessonId));
    };

    const formatDuration = (minutes?: number) => {
        if (!minutes) return "N/A";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return h ? `${h}h ${m}m` : `${m}m`;
    };

    return (
        <div className="h-screen bg-gray-950 text-white flex flex-col">
            {/* TOP BAR */}
            <header className="h-16 flex items-center justify-between px-4 border-b border-gray-800 bg-gray-900">
                <div className="flex items-center gap-3">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setSidebarOpen((v) => !v)}
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </Button>

                    <div>
                        <h1 className="font-semibold truncate max-w-[300px]">
                            {course.title}
                        </h1>
                        <div className="text-xs text-gray-400 flex gap-3">
                            <span>
                                Lesson {currentIndex + 1}/{lessons.length}
                            </span>
                            <span>{formatDuration(currentLesson.duration)}</span>
                        </div>
                    </div>
                </div>

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                        document.querySelector("iframe")?.requestFullscreen()
                    }
                >
                    <Maximize2 />
                </Button>
            </header>

            {/* PROGRESS */}
            <div className="px-4 py-2 bg-gray-900 border-b border-gray-800">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Course progress</span>
                    <span>{completionPercent}%</span>
                </div>
                <Progress value={completionPercent} className="h-1.5 bg-gray-800" />
            </div>

            {/* MAIN GRID */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] overflow-hidden">
                {/* VIDEO AREA */}
                <div className="flex flex-col px-4">
                    <div className="flex-1 bg-black">
                        <iframe
                            key={currentLesson._id}
                            src={`https://www.youtube.com/embed/${extractYouTubeId(
                                currentLesson.videoUrl as string
                            )}?rel=0&autoplay=1`}
                            className="w-full h-full"
                            allowFullScreen
                        />
                    </div>

                    {/* NAV CONTROLS */}
                    <div className="p-4 border-t border-gray-800 bg-gray-900 flex justify-between">
                        <Button
                            variant="outline"
                            onClick={goPrev}
                            disabled={currentIndex === 0}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>

                        <Button
                            onClick={goNext}
                            disabled={currentIndex === lessons.length - 1}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Next
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* SIDEBAR */}
                {sidebarOpen && (
                    <aside className="hidden lg:flex flex-col border-l border-gray-800 bg-gray-900">
                        <div className="p-4 border-b border-gray-800">
                            <h3 className="font-semibold">Course Content</h3>
                            <p className="text-xs text-gray-400">
                                {lessons.length} lessons
                            </p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {lessons.map((lesson, i) => {
                                const active = i === currentIndex;
                                const done = completedLessons.has(lesson._id);

                                return (
                                    <button
                                        key={lesson._id}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`w-full p-3 rounded-lg text-left flex gap-3
                      ${active ? "bg-blue-600/20" : "hover:bg-gray-800"}
                    `}
                                    >
                                        <div className="w-6 text-center">
                                            {done ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <span className="text-sm">{i + 1}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 truncate">
                                            <p className="text-sm truncate">{lesson.title}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="p-4 border-t border-gray-800">
                            <Progress
                                value={completionPercent}
                                className="h-2 bg-gray-800"
                            />
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
}
