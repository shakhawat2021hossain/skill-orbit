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
import { Edit2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateLesson } from "@/services/instructor/updateLesson";
import { toast } from "sonner";

interface Props {
  courseId: string;
  lesson: {
    _id: string;
    title: string;
    duration?: number;
    videoUrl?: string;
  };
}

const EditLessonModal = ({ courseId, lesson }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(lesson.title);
  const [duration, setDuration] = useState(lesson.duration || 0);
  const [videoUrl, setVideoUrl] = useState(lesson.videoUrl || "");

  const handleUpdate = async () => {
    if (!title.trim()) return alert("Title is required");

    setLoading(true);
    const ok = await updateLesson(courseId, lesson._id, {
      title,
      duration,
      videoUrl,
    });
    console.log("ok", ok)
    setLoading(false);

    toast.success("Updated Lesson")

    if (!ok) {
      alert("Failed to update lesson");
      return;
    }

    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Lesson</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label>Lesson Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lesson title"
            />
          </div>

          <div className="space-y-1">
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1">
            <Label>Video URL</Label>
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Update Lesson
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditLessonModal;
