"use client"
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Compass, BookOpen } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex flex-col">


      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <div className="text-9xl font-bold text-gray-900 opacity-5">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl font-bold text-gray-900 mb-2">404</div>
                <div className="text-2xl text-gray-600 font-medium">Page Not Found</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 mb-6">
              <Compass className="h-16 w-16 text-blue-600" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! You've wandered off the path
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link href="/">
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href="/courses">
                <Search className="h-5 w-5" />
                Browse Courses
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="gap-2">
              <Link href="#" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </Link>
            </Button>
          </div>
        </div>
      </div>


    </div>
  );
}