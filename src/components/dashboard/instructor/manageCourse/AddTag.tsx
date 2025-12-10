"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddTagModal({ courseId }: { courseId: string }) {
	const [open, setOpen] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		// TODO: Add tag API
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Tag</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Tag</DialogTitle>
				</DialogHeader>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<Label>Tag Name</Label>
					<Input placeholder="e.g. JavaScript" required />

					<Button className="w-full" type="submit">
						Add Tag
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
