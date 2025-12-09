"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddLessonModal({ courseId }: { courseId: string }) {
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		// TODO: Call API to add lesson

		setOpen(false);
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
					<div>
						<Label>Lesson Title</Label>
						<Input placeholder="Enter lesson title" required />
					</div>

					<div>
						<Label>Description</Label>
						<Textarea placeholder="Lesson description (optional)" />
					</div>

					<div>
						<Label>Video URL</Label>
						<Input placeholder="https://example.com/video" />
					</div>

					<Button type="submit" className="w-full">
						Add Lesson
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
