"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { updateCourse } from "@/services/course/updateCourse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PublishModalProps {
  courseId: string;
  isPublished: boolean;
}

const PublishConfirmationModal: React.FC<PublishModalProps> = ({ courseId, isPublished }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await updateCourse(courseId, { isPublished: !isPublished });
      toast.success(`Course ${isPublished ? "unpublished" : "published"} successfully`);
      router.refresh()
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button size="sm" className="gap-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" variant={isPublished ? "destructive" : "default"} onClick={() => setOpen(true)}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isPublished ? "Unpublish Course" : "Publish Course"}</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to {isPublished ? "unpublish" : "publish"} this course?</p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={loading}>
              {loading ? "Processing..." : isPublished ? "Unpublish" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PublishConfirmationModal;
