import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Software Engineer",
    company: "Google",
    content: "CourseMaster transformed my career. The web development course gave me the skills I needed to land my dream job at Google.",
    rating: 5,
    initials: "AJ",
  },
  {
    name: "Maria Garcia",
    role: "Data Scientist",
    company: "Microsoft",
    content: "The data science courses are exceptional. The hands-on projects helped me build a strong portfolio.",
    rating: 5,
    initials: "MG",
  },
  {
    name: "David Chen",
    role: "Product Designer",
    company: "Figma",
    content: "As a designer, I found the UI/UX courses incredibly valuable. The instructors are top-notch.",
    rating: 4,
    initials: "DC",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who transformed their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl border"
            >
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}