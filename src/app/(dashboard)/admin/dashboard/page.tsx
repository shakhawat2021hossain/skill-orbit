import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Star,
} from "lucide-react";
import Link from "next/link";
import { getUserMetadata } from "@/services/metadata/userData";

export default async function AdminDashboardHome() {
  const meta = await getUserMetadata();

  /* -------------------- SAFE DERIVED METRICS -------------------- */
  const totalUsers = meta.users?.total ?? 0;
  const blockedUsers = meta.users?.blocked ?? 0;

  const totalCourses = meta.courses?.total ?? 0;
  const publishedCourses = meta.courses?.published ?? 0;
  const unpublishedCourses = meta.courses?.unpublished ?? 0;

  const totalEnrollments = meta.enrollments?.total ?? 0;

  const totalRevenue = meta.finance?.totalRevenue ?? 0;

  const pendingActions = unpublishedCourses + blockedUsers;

  const revenuePerEnrollment =
    totalEnrollments > 0
      ? (totalRevenue / totalEnrollments).toFixed(2)
      : "0.00";

  /* -------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Overview of platform performance and system health
              </p>
            </div>

            <Button size="sm" asChild>
              <Link href="/dashboard/admin/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Full Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* ================= MAIN STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* -------- TOTAL REVENUE -------- */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-linear-to-br from-blue-100 to-blue-200 rounded-xl">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                ${revenuePerEnrollment} per enrollment
              </div>
            </CardContent>
          </Card>

          {/* -------- TOTAL USERS -------- */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalUsers}
                  </p>
                </div>
                <div className="p-3 bg-linear-to-br from-green-100 to-green-200 rounded-xl">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <span className="font-medium">{blockedUsers}</span> blocked users
              </div>
            </CardContent>
          </Card>

          {/* -------- TOTAL COURSES -------- */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalCourses}
                  </p>
                </div>
                <div className="p-3 bg-linear-to-br from-purple-100 to-purple-200 rounded-xl">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                {publishedCourses} published · {unpublishedCourses} unpublished
              </div>
            </CardContent>
          </Card>

          {/* -------- PENDING ACTIONS -------- */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Pending Actions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingActions}
                  </p>
                </div>
                <div className="p-3 bg-linear-to-br from-amber-100 to-amber-200 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
              </div>

              <Button variant="link" className="p-0 h-auto text-sm" asChild>
                <Link href="/dashboard/admin/approvals">
                  Review pending items →
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}










// <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//   {/* Left Column - Charts & Metrics */}
//   <div className="lg:col-span-2 space-y-6">
//     {/* Growth Chart */}
//     <Card className="border-0 shadow-lg">
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle className="flex items-center gap-2">
//               <Activity className="h-5 w-5 text-blue-600" />
//               Platform Growth
//             </CardTitle>
//             <CardDescription>User growth over time</CardDescription>
//           </div>
//           <Badge variant="outline">This Month</Badge>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="h-64 flex items-end justify-between gap-1">
//           {[1200, 1350, 1420, 1560, 1680, 1890, 2100, 2345, 2560, 2780, 2950, 3120].map((value, i) => (
//             <div key={i} className="flex-1 flex flex-col items-center">
//               <div
//                 className="w-full bg-linear-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:opacity-80"
//                 style={{ height: `${(value / 4000) * 100}%` }}
//                 title={`${value} users`}
//               />
//               <div className="text-xs text-gray-500 mt-2">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</div>
//             </div>
//           ))}
//         </div>
//         <div className="grid grid-cols-3 gap-4 mt-6">
//           <div className="text-center">
//             <div className="text-xl font-bold text-gray-900">+{mockData.platformStats.monthlyGrowth}%</div>
//             <div className="text-sm text-gray-600">Growth Rate</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold text-gray-900">98.5%</div>
//             <div className="text-sm text-gray-600">Uptime</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold text-gray-900">2.4s</div>
//             <div className="text-sm text-gray-600">Avg Response</div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>

//     {/* Recent Courses */}
//     <Card className="border-0 shadow-lg">
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle className="flex items-center gap-2">
//               <BookOpen className="h-5 w-5 text-purple-600" />
//               Recent Courses
//             </CardTitle>
//             <CardDescription>Newly published courses</CardDescription>
//           </div>
//           <Button variant="ghost" size="sm" asChild>
//             <Link href="/dashboard/admin/courses">
//               View all
//             </Link>
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {mockData.recentCourses.map((course) => (
//             <div key={course.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 bg-linear-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
//                   <BookOpen className="h-5 w-5 text-purple-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-900">{course.title}</h4>
//                   <p className="text-sm text-gray-500">By {course.instructor}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Badge variant={course.status === 'published' ? 'default' : 'outline'}>
//                   {course.status}
//                 </Badge>
//                 <div className="text-right">
//                   <div className="font-medium text-gray-900">${course.price}</div>
//                   <div className="text-sm text-gray-500">{course.students} students</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   </div>

//   {/* Right Column - Activities & Quick Stats */}
//   <div className="space-y-6">
//     {/* Recent Activities */}
//     <Card className="border-0 shadow-lg">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Activity className="h-5 w-5 text-green-600" />
//           Recent Activities
//         </CardTitle>
//         <CardDescription>System events and user actions</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {mockData.recentActivities.map((activity) => (
//             <div key={activity.id} className="flex items-start gap-3">
//               <div className={`mt-1 h-2 w-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' :
//                   activity.status === 'warning' ? 'bg-amber-500' :
//                     'bg-blue-500'
//                 }`} />
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-900">{activity.action}</p>
//                 <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
//                   <span>User: {activity.user}</span>
//                   <span>{activity.time}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//       <CardContent className="pt-0">
//         <Button variant="outline" className="w-full" asChild>
//           <Link href="/dashboard/admin/activities">
//             View All Activities
//           </Link>
//         </Button>
//       </CardContent>
//     </Card>

//     {/* Top Instructors */}
//     <Card className="border-0 shadow-lg">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <UserCheck className="h-5 w-5 text-blue-600" />
//           Top Instructors
//         </CardTitle>
//         <CardDescription>By revenue and students</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {mockData.topInstructors.map((instructor) => (
//             <div key={instructor.id} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
//                   <span className="font-semibold text-blue-700">
//                     {instructor.name.split(' ').map(n => n[0]).join('')}
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-sm text-gray-900">{instructor.name}</h4>
//                   <p className="text-xs text-gray-500">{instructor.courses} courses</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="font-medium text-sm text-gray-900">${instructor.revenue.toLocaleString()}</div>
//                 <div className="text-xs text-gray-500">{instructor.students} students</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>

//     {/* Quick Stats */}
//     <Card className="border-0 shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-lg">Quick Stats</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div className="text-center p-3 bg-gray-50 rounded-lg">
//             <div className="text-xl font-bold text-gray-900">89%</div>
//             <div className="text-sm text-gray-600">Course Completion</div>
//           </div>
//           <div className="text-center p-3 bg-gray-50 rounded-lg">
//             <div className="text-xl font-bold text-gray-900">4.8</div>
//             <div className="text-sm text-gray-600">Avg Rating</div>
//           </div>
//           <div className="text-center p-3 bg-gray-50 rounded-lg">
//             <div className="text-xl font-bold text-gray-900">92%</div>
//             <div className="text-sm text-gray-600">Satisfaction</div>
//           </div>
//           <div className="text-center p-3 bg-gray-50 rounded-lg">
//             <div className="text-xl font-bold text-gray-900">45%</div>
//             <div className="text-sm text-gray-600">Repeat Users</div>
//           </div>
//         </div>
//         <Button variant="outline" className="w-full" asChild>
//           <Link href="/dashboard/admin/reports">
//             <Download className="h-4 w-4 mr-2" />
//             Download Reports
//           </Link>
//         </Button>
//       </CardContent>
//     </Card>
//   </div>
// </div>

// {/* Bottom CTA */}
// <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//   <Card className="border-0 shadow-lg bg-linear-to-r from-blue-50 to-indigo-50">
//     <CardContent className="p-6">
//       <div className="flex items-center gap-3">
//         <div className="p-3 bg-white rounded-lg">
//           <Shield className="h-6 w-6 text-blue-600" />
//         </div>
//         <div>
//           <h3 className="font-semibold text-gray-900">System Health</h3>
//           <p className="text-sm text-gray-600">All systems operational</p>
//         </div>
//       </div>
//     </CardContent>
//   </Card>

//   <Card className="border-0 shadow-lg bg-linear-to-r from-green-50 to-emerald-50">
//     <CardContent className="p-6">
//       <div className="flex items-center gap-3">
//         <div className="p-3 bg-white rounded-lg">
//           <Target className="h-6 w-6 text-green-600" />
//         </div>
//         <div>
//           <h3 className="font-semibold text-gray-900">Daily Target</h3>
//           <p className="text-sm text-gray-600">85% of daily goal achieved</p>
//         </div>
//       </div>
//     </CardContent>
//   </Card>

//   <Card className="border-0 shadow-lg bg-linear-to-r from-purple-50 to-pink-50">
//     <CardContent className="p-6">
//       <div className="flex items-center gap-3">
//         <div className="p-3 bg-white rounded-lg">
//           <Calendar className="h-6 w-6 text-purple-600" />
//         </div>
//         <div>
//           <h3 className="font-semibold text-gray-900">Upcoming Tasks</h3>
//           <p className="text-sm text-gray-600">3 items pending review</p>
//         </div>
//       </div>
//     </CardContent>
//   </Card>
// </div>