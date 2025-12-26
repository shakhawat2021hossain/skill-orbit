"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { removeFromWishlistAction } from "@/services/wishlist/removeFromWishlist";

export const RemoveWishlistButton = ({ courseId }: { courseId: string }) => {
    const [isPending, startTransition] = useTransition();

    const handleRemove = () => {
        startTransition(async () => {
            const res = await removeFromWishlistAction(courseId);

            if (res?.success) {
                toast.success("Removed from wishlist");
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        });
    };

    return (
        <button
            onClick={handleRemove}
            disabled={isPending}
            className="flex w-full items-center text-red-600 disabled:opacity-50 hover:bg-red-50 px-2 py-1.5 rounded-md"
        >
            <Trash2 className="h-4 w-4 mr-5" />
            <span className="flex-1 text-left">
                {isPending ? "Removing..." : "Remove"}
            </span>

        </button>
    );
};
