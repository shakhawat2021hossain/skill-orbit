import { CheckCircle, Award, Users, Clock, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Industry Recognized Certificates",
    description: "Get certificates that are valued by top companies worldwide.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience.",
  },
  {
    icon: Clock,
    title: "Learn at Your Own Pace",
    description: "Access courses anytime, anywhere with lifetime access.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Join 1M+ learners from 190+ countries.",
  },
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "30-day refund policy if you're not satisfied.",
  },
  {
    icon: CheckCircle,
    title: "Hands-On Projects",
    description: "Apply your learning with real-world projects.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose CourseMaster?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best learning experience for our students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex p-3 rounded-lg bg-blue-50 mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}