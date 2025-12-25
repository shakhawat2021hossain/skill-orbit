"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Image as ImageIcon, Video, Globe, DollarSign, Tag } from "lucide-react";
import { Category } from "@/types/course";
import { updateCourse } from "@/services/course/updateCourse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditCourseModalProps {
    course: {
        _id: string;
        title: string;
        description: string;
        price: number;
        category: Category;
        instructor: string;
        introVideo?: string;
        thumbnail?: string;
        tags?: string[];
    };
    children?: React.ReactNode;
}

export default function EditCourseModal({ course, children }: EditCourseModalProps) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: course.title,
        description: course.description,
        price: course.price.toString(),
        category: course.category,
        introVideo: course.introVideo || "",
        thumbnail: course.thumbnail || "",
    });
    const [tags, setTags] = useState<string[]>(course.tags || []);
    const [newTag, setNewTag] = useState("");

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            setFormData({
                title: course.title,
                description: course.description,
                price: course.price.toString(),
                category: course.category,
                introVideo: course.introVideo || "",
                thumbnail: course.thumbnail || "",
            });
            setTags(course.tags || []);
            setNewTag("");
        }
    }, [open, course]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedData = {
                ...formData,
                price: parseFloat(formData.price),
                tags,
            };

            // Call update API
            const updatedCourse = await updateCourse(course._id, updatedData);
            console.log("update", updateCourse)
            toast.success("Updated Successfully")
            router.refresh()


            setOpen(false);
        } catch (error) {
            console.error("Failed to update course:", error);
            // You might want to add toast notification here
        } finally {
            setLoading(false);
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            handleAddTag();
        }
    };

    const categories = Object.values(Category);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm">
                        Edit Course
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Edit Course</DialogTitle>
                        <DialogDescription>
                            Update your course information. Changes will be saved immediately.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <ImageIcon className="h-5 w-5" />
                                Basic Information
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <Label htmlFor="title">Course Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Enter course title"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe your course in detail..."
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="price">Price ($) *</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="pl-9"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Category *</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Media */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Video className="h-5 w-5" />
                                Media
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="thumbnail"
                                            value={formData.thumbnail}
                                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                            placeholder="https://example.com/thumbnail.jpg"
                                        />
                                        <Button type="button" variant="outline" size="icon">
                                            <Upload className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Recommended: 1280x720px (16:9 aspect ratio)
                                    </p>

                                    {formData.thumbnail && (
                                        <div className="mt-2">
                                            <div className="text-sm text-gray-600 mb-1">Preview:</div>
                                            <div className="relative w-32 h-20 rounded-md overflow-hidden border">
                                                <img
                                                    src={formData.thumbnail}
                                                    alt="Thumbnail preview"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='10' text-anchor='middle' fill='%239ca3af'%3EImage%3C/text%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="introVideo">Introduction Video URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="introVideo"
                                            value={formData.introVideo}
                                            onChange={(e) => setFormData({ ...formData, introVideo: e.target.value })}
                                            placeholder="https://youtube.com/watch?v=..."
                                        />
                                        <Button type="button" variant="outline" size="icon">
                                            <Globe className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        YouTube or Vimeo URL for course preview
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Tag className="h-5 w-5" />
                                Course Tags
                            </h3>

                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Add a tag (e.g., React, Beginner)"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <Button type="button" onClick={handleAddTag} variant="outline">
                                        Add
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary" className="px-3 py-1">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-2 hover:text-red-500"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                    {tags.length === 0 && (
                                        <p className="text-sm text-gray-500">No tags added yet</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Instructor Info (Read-only) */}
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900">Instructor Information</h3>
                            <div className="text-sm text-gray-600">
                                <p className="font-medium">Instructor: {course.instructor}</p>
                                <p className="mt-1">This information is managed in your profile settings.</p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}