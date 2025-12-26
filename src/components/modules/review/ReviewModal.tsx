"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { addReview } from "@/services/review/postReview";


// Simple star rating component
const StarRating: React.FC<{
    rating: number;
    setRating: (val: number) => void;
}> = ({ rating, setRating }) => {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

interface ReviewModalProps {
    courseId: string;
    studentId: string;
    onReviewSubmitted?: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
    courseId,
    onReviewSubmitted,
}) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        const data = {
            courseId,
            rating,
            review: reviewText
        }
        try{

            const result = await addReview(data)
            console.log("res from modal", result)
            toast.success("Review added Successfully!")
            setOpen(false)
        }
        catch(error){
            console.log("review posting failed", error)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Write a Review</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <DialogDescription>
                        Share your thoughts about this course.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    <label className="block font-medium">Rating</label>
                    <StarRating rating={rating} setRating={setRating} />

                    <label className="block font-medium">Review (optional)</label>
                    <textarea
                        className="w-full border rounded-md p-2 text-sm resize-none"
                        rows={4}
                        maxLength={1000}
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
