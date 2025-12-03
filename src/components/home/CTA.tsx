import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className=" my-6 ">
      <div className="max-w-7xl mx-auto px-4 py-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Learning Journey Today
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 1.2 million learners worldwide and transform your career with our
            industry-leading courses. No credit card required to start.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8"
              asChild
            >
              <Link href="/courses">
                Browse Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
              asChild
            >
              <Link href="/login">
                Create Free Account
              </Link>
            </Button>
          </div>

          <p className="text-sm text-blue-200 mt-6">
            7-day free trial • No commitment • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}