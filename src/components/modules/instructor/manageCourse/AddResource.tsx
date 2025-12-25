"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddResourceModal({ courseId }: { courseId: string }) {
	const [open, setOpen] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		// TODO: Add resource API
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Resource</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Resource</DialogTitle>
				</DialogHeader>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<Label>Resource Title</Label>
						<Input placeholder="e.g. GitHub Repo" required />
					</div>

					<div>
						<Label>Resource Link</Label>
						<Input placeholder="https://..." required />
					</div>

					<Button type="submit" className="w-full">
						Add Resource
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
