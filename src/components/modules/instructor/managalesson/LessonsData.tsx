"use client"
import { useEffect, useState } from 'react';
import { ICourse } from '@/types/course';
import { deleteLesson } from "@/services/instructor/deleteLesson";
import { CardContent } from '@/components/ui/card';
import { ClockCheck, Edit2, ExternalLink, Trash2, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddLessonModal from './AddLesson';
import { useRouter } from 'next/navigation';
import EditLessonModal from './EditLessonModal';


const LessonsData = ({ course }: { course: ICourse }) => {
    const lessons = course.syllabus || []
    const router = useRouter()


    const handleDelete = async (lessonId: string) => {
        if (!confirm("Delete this lesson?")) return;
        try {
            const ok = await deleteLesson(course._id, lessonId);
            router.refresh()
            if (!ok) {
                alert("Failed to delete lesson. Please try again.");
            }
        } catch (err) {
            alert("Error deleting lesson.");
        }
    };

    return (
        <div>
            <CardContent>
                {lessons?.length ? (
                    <div className="space-y-3">
                        {lessons.map((lesson: any, index: number) => (
                            <div
                                key={lesson._id || index}
                                className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0">
                                        <span className="font-bold text-blue-700">{index + 1}</span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-semibold text-gray-900 truncate">{lesson.title}</h4>
                                        <div className="flex items-center gap-4 mt-1">
                                            {lesson.duration && (
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <ClockCheck className="h-3 w-3" />
                                                    {lesson.duration} min
                                                </div>
                                            )}
                                            {lesson.videoUrl && (
                                                <a
                                                    href={lesson.videoUrl}
                                                    target="_blank"
                                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    Watch Video
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <EditLessonModal
                                        courseId={course._id}
                                        lesson={lesson}
                                    />

                                    <Button onClick={() => handleDelete(lesson._id)} variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Video className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Lessons Yet</h3>
                        <p className="text-gray-500 mb-6">Start by adding your first lesson to this course</p>
                        <AddLessonModal courseId={course._id} />
                    </div>
                )}
            </CardContent>
        </div>
    );
};

export default LessonsData;