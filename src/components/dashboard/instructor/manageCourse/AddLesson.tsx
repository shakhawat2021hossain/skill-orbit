"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLesson } from "@/services/course/createLesson";
import { useRouter } from "next/navigation";

export default function AddLessonModal({ courseId }: { courseId: string }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

	const router = useRouter();


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const payload = {
            title,
            duration: Number(duration),
            videoUrl,
        };

        const result = await createLesson(courseId, payload);

        setLoading(false);

        if (!result) {
            alert("Failed to add lesson");
            return;
        }

        // Success
        setTitle("");
        setDuration("");
        setVideoUrl("");
        setOpen(false);
		router.refresh()

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Lesson</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Lesson</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <Label className="my-2">Lesson Title</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter lesson title"
                            required
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <Label className="my-2">Duration</Label>
                        <Input
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Lesson duration"
							required
                        />
                    </div>

                    {/* Video URL */}
                    <div>
                        <Label className="my-2">Video URL</Label>
                        <Input
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://example.com/video"
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Adding..." : "Add Lesson"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
