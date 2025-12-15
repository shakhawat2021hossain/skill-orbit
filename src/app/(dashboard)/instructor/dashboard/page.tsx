import { 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star, 
  Clock, 
  MessageSquare,
  BarChart3,
  Plus,
  Award,
  Calendar,
  Bell,
  Rocket,
  Target,
  ChartBar,
  FileText,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getInsDetails } from "@/services/instructor/instructorDetails";

// Mock data for instructor
const mockData = {
  stats: {
    totalCourses: 5,
    totalStudents: 342,
    totalRevenue: 15420,
    avgRating: 4.7,
    completionRate: 78,
    activeCourses: 3
  },
  recentEnrollments: [
    { id: "1", student: "Alex Johnson", course: "React Masterclass", date: "2 hours ago", amount: "$89.99" },
    { id: "2", student: "Sarah Miller", course: "Node.js Backend", date: "5 hours ago", amount: "$99.99" },
    { id: "3", student: "Mike Chen", course: "UI/UX Design", date: "1 day ago", amount: "$79.99" },
    { id: "4", student: "Emma Wilson", course: "React Masterclass", date: "2 days ago", amount: "$89.99" }
  ],
  topCourses: [
    { id: "1", title: "React Masterclass", students: 145, revenue: 13050, rating: 4.8, progress: 95 },
    { id: "2", title: "Node.js Backend", students: 98, revenue: 9790, rating: 4.6, progress: 78 },
    { id: "3", title: "UI/UX Design", students: 76, revenue: 6070, rating: 4.9, progress: 62 },
    { id: "4", title: "JavaScript Basics", students: 23, revenue: 1149, rating: 4.5, progress: 45 }
  ],
  recentReviews: [
    { id: "1", student: "David Lee", course: "React Masterclass", rating: 5, comment: "Excellent course! Very comprehensive.", date: "Yesterday" },
    { id: "2", student: "Lisa Wang", course: "Node.js Backend", rating: 4, comment: "Great content, but could use more examples.", date: "2 days ago" },
    { id: "3", student: "Tom Harris", course: "UI/UX Design", rating: 5, comment: "Best design course I've taken!", date: "3 days ago" }
  ],
  upcomingTasks: [
    { id: "1", task: "Add quiz to Module 5", course: "React Masterclass", due: "Today", priority: "high" },
    { id: "2", task: "Record intro video", course: "New Course", due: "Tomorrow", priority: "medium" },
    { id: "3", task: "Update course materials", course: "JavaScript Basics", due: "Nov 30", priority: "low" }
  ]
};

export default async function InstructorDashboardHome() {
  const details = await getInsDetails()
  console.log(details)
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, <span className="text-blue-600">Instructor!</span> 👨‍🏫
            </h1>
            <p className="text-gray-600 text-lg">
              Track your courses, students, and earnings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            <Button asChild className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2">
              <Link href="/instructor/courses/create">
                <Plus className="h-4 w-4" />
                Create Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-0 shadow-sm bg-linear-to-br from-blue-50 to-indigo-50 lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${mockData.stats.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    +12.5% from last month
                  </div>
                </div>
                <div className="p-3 bg-white/50 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-linear-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.stats.totalStudents}</p>
                </div>
                <div className="p-3 bg-white/50 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <Progress value={78} className="mt-4 h-2 bg-white/50" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-linear-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.stats.avgRating}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(mockData.stats.avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-white/50 rounded-full">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-linear-to-br from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.stats.completionRate}%</p>
                </div>
                <div className="p-3 bg-white/50 rounded-full">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Courses & Revenue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Performing Courses */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Top Performing Courses
                  </CardTitle>
                  <CardDescription>
                    Sort by revenue, students, or rating
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/instructor/courses">
                    View all courses
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.topCourses.map((course) => (
                  <div key={course.id} className="group p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            {course.students} students
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            ${course.revenue}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            {course.rating}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{course.progress}%</div>
                          <Progress value={course.progress} className="w-24 h-2 mt-1" />
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/instructor/courses/${course.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Revenue & Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ChartBar className="h-4 w-4 text-blue-600" />
                  Revenue This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">$3,845</div>
                    <div className="text-sm text-green-600 flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +18.2% from last month
                    </div>
                  </div>
                  <div className="h-48 flex items-end justify-between gap-1">
                    {[40, 65, 75, 60, 85, 90, 100, 80, 95, 70, 85, 95].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-linear-to-t from-blue-500 to-blue-600 rounded-t-lg"
                          style={{ height: `${height}%` }}
                        />
                        <div className="text-xs text-gray-500 mt-2">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-green-600" />
                  Student Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">78%</div>
                      <div className="text-xs text-gray-600">Completion Rate</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">4.7</div>
                      <div className="text-xs text-gray-600">Avg Rating</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">92%</div>
                      <div className="text-xs text-gray-600">Satisfaction</div>
                    </div>
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">45%</div>
                      <div className="text-xs text-gray-600">Repeat Students</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/instructor/analytics">
                      View Detailed Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Enrollments */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Recent Enrollments
                  </CardTitle>
                  <CardDescription>
                    {mockData.recentEnrollments.length} new students
                  </CardDescription>
                </div>
                <Badge variant="secondary">+{mockData.recentEnrollments.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.recentEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">{enrollment.student}</h4>
                      <p className="text-xs text-gray-500">{enrollment.course}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm text-gray-900">{enrollment.amount}</div>
                      <div className="text-xs text-gray-500">{enrollment.date}</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/instructor/enrollments">
                    View All Enrollments
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-600" />
                Recent Reviews
              </CardTitle>
              <CardDescription>
                Student feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentReviews.map((review) => (
                  <div key={review.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {review.student.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-900">{review.student}</h4>
                          <p className="text-xs text-gray-500">{review.course}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">{review.comment}</p>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/instructor/reviews">
                    View All Reviews
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900">{task.task}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{task.course}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{task.due}</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/instructor/tasks">
                    View All Tasks
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}