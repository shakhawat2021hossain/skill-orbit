"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  Shield, 
  Calendar,
  Lock,
  Globe,
  Bell,
  ShieldCheck,
  Key,
  Edit2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { IUser } from "@/types/user";
import { format } from "date-fns";
import { getUserInfo } from "@/services/user/getUser";
import EditProfileModal from "@/components/modules/dashboard/UpdateProfileModal";
import ChangePasswordModal from "@/components/modules/dashboard/ChangePassModal";

export default function ProfileManagementPage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await getUserInfo();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN": return "bg-red-100 text-red-800 hover:bg-red-100";
      case "INSTRUCTOR": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "STUDENT": return "bg-green-100 text-green-800 hover:bg-green-100";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Profile</h2>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <Button onClick={fetchUserData}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account and security settings</p>
            </div>
            <div className="flex gap-2">
              <EditProfileModal 
                user={user} 
                onSuccess={fetchUserData}
              >
                <Button variant="outline" className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </EditProfileModal>
              <ChangePasswordModal userId={user._id}>
                <Button variant="outline" className="gap-2">
                  <Key className="h-4 w-4" />
                  Change Password
                </Button>
              </ChangePasswordModal>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your basic profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback className="text-lg bg-linear-to-br from-blue-100 to-indigo-100 text-blue-700">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{user.email}</p>
                      {user.institute && (
                        <p className="text-sm text-gray-500 mt-1">
                          <School className="inline h-3 w-3 mr-1" />
                          {user.institute}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email Address</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>

                      {user.phone && (
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center">
                            <Phone className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Phone Number</p>
                            <p className="font-medium">{user.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {user.address && (
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Address</p>
                            <p className="font-medium">{user.address}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Member Since</p>
                          <p className="font-medium">
                            {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Status Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  Account Status
                </CardTitle>
                <CardDescription>
                  Your account security and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${user.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        <span className="text-gray-700">Account Status</span>
                      </div>
                      <Badge variant={user.isBlocked ? "destructive" : "default"}>
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${user.isDeleted ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                        <span className="text-gray-700">Deleted Status</span>
                      </div>
                      <span className="text-sm font-medium">
                        {user.isDeleted ? 'Deleted' : 'Active'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Password</span>
                      </div>
                      <ChangePasswordModal userId={user._id}>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Change Password
                        </Button>
                      </ChangePasswordModal>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Email Verified</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Security */}
          <div className="space-y-6">
            {/* Security Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-600" />
                  Security
                </CardTitle>
                <CardDescription>
                  Protect your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ChangePasswordModal userId={user._id}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Key className="h-4 w-4" />
                    Change Password
                  </Button>
                </ChangePasswordModal>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Two-Factor Authentication
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Globe className="h-4 w-4" />
                  Login Activity
                </Button>
              </CardContent>
            </Card>

            {/* Account Details Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p className="text-sm font-mono text-gray-900 break-all">{user._id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Account Role</p>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Created On</p>
                  <p className="text-sm font-medium">
                    {format(new Date(user.createdAt), 'PPpp')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-0 shadow-lg border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-700">Danger Zone</CardTitle>
                <CardDescription className="text-red-600">
                  Irreversible actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-100 hover:text-red-700">
                  Request Account Deletion
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-100 hover:text-red-700">
                  Export Account Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}