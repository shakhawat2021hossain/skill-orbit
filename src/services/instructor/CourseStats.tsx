import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, BookOpen, Download } from "lucide-react";

interface CourseStatsProps {
  course: {
    enrollments?: number;
    revenue?: number;
  };
}

export default function CourseStats({ course }: CourseStatsProps) {
  const stats = [
    {
      title: "Total Students",
      value: course.enrollments || 0,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Revenue",
      value: `$${(course.revenue || 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Lessons",
      value: "6/8", // Mock data - would come from API
      icon: BookOpen,
      color: "text-purple-500",
    },
    {
      title: "Resources",
      value: "4", // Mock data - would come from API
      icon: Download,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}