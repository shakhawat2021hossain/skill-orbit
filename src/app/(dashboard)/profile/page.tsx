import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Calendar, 
  Edit, 
  BookOpen, 
  Award,
  Settings,
  Shield,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { getUserInfo } from "@/services/user/getUser";

export default async function ProfilePage() {
  const user = await getUserInfo();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl border p-8">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Please Sign In</h2>
                <p className="text-gray-600 mb-6">Sign in to view your profile</p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 border-2 border-white shadow">
                        <AvatarFallback className="text-xl bg-blue-600 text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4 w-full"
                        asChild
                      >
                        <Link href="/profile/edit">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Link>
                      </Button>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                          {user.role}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                          <span>
                            Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-green-600">Email verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Courses</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-sm text-gray-500">Enrolled</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Award className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-semibold">Certificates</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                      <p className="text-sm text-gray-500">Completed</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="font-semibold">Hours</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">145</p>
                      <p className="text-sm text-gray-500">Total learning</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4 mr-3" />
                        Account Settings
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/courses">
                        <BookOpen className="h-4 w-4 mr-3" />
                        My Courses
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/certificates">
                        <Award className="h-4 w-4 mr-3" />
                        Certificates
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium">Completed course</p>
                        <p className="text-sm text-gray-500">Web Development Basics</p>
                        <p className="text-xs text-gray-400">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium">Started course</p>
                        <p className="text-sm text-gray-500">Data Science Fundamentals</p>
                        <p className="text-xs text-gray-400">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Plan</span>
                    <Badge className="bg-blue-600 text-white">Premium</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/billing">Manage Subscription</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}