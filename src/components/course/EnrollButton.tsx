"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { enrollCourse } from "@/services/course/enrollCourse";

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      const result = await enrollCourse(courseId);
      setLoading(false);

      if (!result) {
        alert("Failed to start enrollment. Please login and try again.");
        return;
      }

      // common places the backend might put the checkout URL
      const session = result.session || result;
      const url = session?.url || session?.checkout_url || result?.url || null;

      if (url) {
        window.location.href = url;
        return;
      }

      // fallback: show session data for debugging
      console.log("enroll result:", result);
      alert("Enrollment started. Check console for details.");
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Error starting enrollment. Please try again.");
    }
  };

  return (
    <Button onClick={handleEnroll} className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-4" disabled={loading}>
      {loading ? "Starting..." : "Enroll Now"}
    </Button>
  );
}
