import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar, 
  PlayCircle, 
  Target, 
  Star, 
  Users,
  ChevronRight,
  GraduationCap,
  BarChart3,
  Rocket,
  Bell,
  Bookmark,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data - replace with real API calls
const mockData = {
  stats: {
    totalCourses: 6,
    completedCourses: 2,
    hoursSpent: 42,
    streakDays: 7,
    avgScore: 85,
    upcomingDeadlines: 3
  },
  recentCourses: [
    {
      id: "1",
      title: "React Masterclass",
      instructor: "Sarah Johnson",
      progress: 75,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
      category: "Frontend",
      lastAccessed: "2 hours ago",
      nextLesson: "State Management"
    },
    {
      id: "2",
      title: "Node.js Backend",
      instructor: "Mike Chen",
      progress: 30,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
      category: "Backend",
      lastAccessed: "1 day ago",
      nextLesson: "Express Middleware"
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      instructor: "Alex Rivera",
      progress: 15,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
      category: "Design",
      lastAccessed: "3 days ago",
      nextLesson: "Color Theory"
    }
  ],
  upcomingLessons: [
    {
      id: "1",
      title: "Advanced React Hooks",
      course: "React Masterclass",
      time: "Today, 3:00 PM",
      duration: "45 min",
      type: "video"
    },
    {
      id: "2",
      title: "Database Relationships",
      course: "Node.js Backend",
      time: "Tomorrow, 10:00 AM",
      duration: "60 min",
      type: "video"
    },
    {
      id: "3",
      title: "Design Quiz",
      course: "UI/UX Design Principles",
      time: "Nov 28, 2:30 PM",
      duration: "30 min",
      type: "quiz"
    }
  ],
  achievements: [
    { id: "1", title: "Early Bird", description: "Complete 5 lessons before 8 AM", icon: Clock, unlocked: true },
    { id: "2", title: "Perfect Score", description: "Score 100% on 3 quizzes", icon: Star, unlocked: false },
    { id: "3", title: "Week Warrior", description: "7-day learning streak", icon: TrendingUp, unlocked: true },
    { id: "4", title: "Course Explorer", description: "Enroll in 5 courses", icon: BookOpen, unlocked: true }
  ],
  recommendations: [
    {
      id: "1",
      title: "JavaScript Algorithms",
      instructor: "David Wilson",
      rating: 4.9,
      students: 1245,
      category: "Programming",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop"
    },
    {
      id: "2",
      title: "Mobile App Development",
      instructor: "Lisa Wang",
      rating: 4.8,
      students: 892,
      category: "Mobile",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop"
    }
  ]
};

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, <span className="text-blue-600">Student!</span> 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Continue your learning journey and track your progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2">
              <Rocket className="h-4 w-4" />
              Start Learning
            </Button>
          </div>
        </div>

        {/* Daily Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-linear-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Today's Goal</p>
                  <p className="text-2xl font-bold text-gray-900">45 min</p>
                </div>
                <div className="p-3 bg-white/50 rounded-full">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <Progress value={60} className="mt-4 h-2 bg-white/50" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-linear-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Learning Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.stats.streakDays} days</p>
                </div>
                <div className="p-3 bg-white/50 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">Keep it up! 🔥</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-linear-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Hours Spent</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.stats.hoursSpent}</p>
                </div>
                <div className="p-3 bg-white/50 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-purple-600 mt-2">+2h from last week</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-linear-to-br from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.stats.avgScore}%</p>
                </div>
                <div className="p-3 bg-white/50 rounded-full">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-2">Excellent! ⭐</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Active Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Courses */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Active Courses
                  </CardTitle>
                  <CardDescription>
                    Continue where you left off
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/my-course">
                    View all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className="group p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full md:w-32 h-24 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-2 left-2 text-xs bg-white/90 text-gray-800">
                          {course.category}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                            <p className="text-sm text-gray-500">By {course.instructor}</p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {course.progress}%
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.lastAccessed}
                            </div>
                            <div className="text-blue-600 font-medium">
                              Next: {course.nextLesson}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={`/dashboard/my-course/${course.id}`}>
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Continue
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    Recommended For You
                  </CardTitle>
                  <CardDescription>
                    Based on your learning history
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  See more
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.recommendations.map((course) => (
                  <div key={course.id} className="group border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{course.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">By {course.instructor}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.students.toLocaleString()}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {course.category}
                          </Badge>
                        </div>
                        <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Lessons */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Upcoming Lessons
                  </CardTitle>
                  <CardDescription>
                    {mockData.upcomingLessons.length} scheduled
                  </CardDescription>
                </div>
                <Badge variant="secondary">{mockData.stats.upcomingDeadlines}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`p-2 rounded-lg ${lesson.type === 'quiz' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                      {lesson.type === 'quiz' ? (
                        <Award className="h-5 w-5 text-amber-600" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate">{lesson.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{lesson.course}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/schedule">
                    View Full Schedule
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                Achievements
              </CardTitle>
              <CardDescription>
                Unlock badges by learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={achievement.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${achievement.unlocked ? 'bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200' : 'bg-gray-50 opacity-60'}`}
                    >
                      <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-amber-100' : 'bg-gray-200'}`}>
                        <Icon className={`h-5 w-5 ${achievement.unlocked ? 'text-amber-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium text-sm ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </h4>
                          {achievement.unlocked && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/achievements">
                    View All Achievements
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Learning Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Courses</span>
                  <span className="font-semibold text-gray-900">{mockData.stats.totalCourses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-gray-900">{mockData.stats.completedCourses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="font-semibold text-gray-900">
                    {mockData.stats.totalCourses - mockData.stats.completedCourses}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Daily Time</span>
                  <span className="font-semibold text-gray-900">1.2h</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/analytics">
                  View Detailed Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}