"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MoreVertical,
  User,
  Mail,
  Shield,
  Lock,
  Unlock,
  Trash2,
  Eye,
  UserCog,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { UserRole, IUser } from "@/types/user";
import { getUsers } from "@/services/user/getAllUser";

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Dialog states
  const [deleteDialog, setDeleteDialog] = useState<{open: boolean, userId: string, userName: string}>({
    open: false,
    userId: "",
    userName: ""
  });
  const [roleDialog, setRoleDialog] = useState<{open: boolean, userId: string, userName: string, currentRole: UserRole}>({
    open: false,
    userId: "",
    userName: "",
    currentRole: UserRole.STUDENT
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getUsers();
      setUsers(usersData || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

//   const handleBlockUser = async (userId: string, isCurrentlyBlocked: boolean) => {
//     try {
//       await updateUser(userId, { isBlocked: !isCurrentlyBlocked });
//       fetchUsers();
//     } catch (error) {
//       console.error("Failed to update user:", error);
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       await deleteUser(deleteDialog.userId);
//       setDeleteDialog({ open: false, userId: "", userName: "" });
//       fetchUsers();
//     } catch (error) {
//       console.error("Failed to delete user:", error);
//     }
//   };

//   const handleRoleChange = async (newRole: UserRole) => {
//     try {
//       await updateUser(roleDialog.userId, { role: newRole });
//       setRoleDialog({ open: false, userId: "", userName: "", currentRole: UserRole.STUDENT });
//       fetchUsers();
//     } catch (error) {
//       console.error("Failed to update user role:", error);
//     }
//   };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && !user.isBlocked && !user.isDeleted) ||
      (statusFilter === "blocked" && user.isBlocked) ||
      (statusFilter === "deleted" && user.isDeleted);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case UserRole.ADMIN: return "bg-red-100 text-red-800";
      case UserRole.INSTRUCTOR: return "bg-blue-100 text-blue-800";
      case UserRole.STUDENT: return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage all users on the platform</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {filteredUsers.length} users
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Role Filter */}
                <div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value={UserRole.ADMIN}>Admins</SelectItem>
                      <SelectItem value={UserRole.INSTRUCTOR}>Instructors</SelectItem>
                      <SelectItem value={UserRole.STUDENT}>Students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="deleted">Deleted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Manage user accounts, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {user.isDeleted ? (
                              <Badge variant="outline" className="text-red-600 border-red-300">
                                <XCircle className="h-3 w-3 mr-1" />
                                Deleted
                              </Badge>
                            ) : user.isBlocked ? (
                              <Badge variant="outline" className="text-amber-600 border-amber-300">
                                <Lock className="h-3 w-3 mr-1" />
                                Blocked
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-green-600 border-green-300">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => setRoleDialog({
                                  open: true,
                                  userId: user._id,
                                  userName: user.name,
                                  currentRole: user.role
                                })}
                              >
                                <UserCog className="h-4 w-4 mr-2" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className={user.isBlocked ? "text-green-600" : "text-amber-600"}
                              >
                                {user.isBlocked ? (
                                  <>
                                    <Unlock className="h-4 w-4 mr-2" />
                                    Unblock User
                                  </>
                                ) : (
                                  <>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Block User
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => setDeleteDialog({
                                  open: true,
                                  userId: user._id,
                                  userName: user.name
                                })}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({...deleteDialog, open})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold">{deleteDialog.userName}</span>? 
              This action cannot be undone. All user data will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({...deleteDialog, open: false})}>
              Cancel
            </Button>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={roleDialog.open} onOpenChange={(open) => setRoleDialog({...roleDialog, open})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Change User Role
            </DialogTitle>
            <DialogDescription>
              Change role for <span className="font-semibold">{roleDialog.userName}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={roleDialog.currentRole === UserRole.ADMIN ? "default" : "outline"}
                className="flex-col h-auto py-4"
              >
                <Shield className="h-6 w-6 mb-2 text-red-600" />
                <span>Admin</span>
                <span className="text-xs text-gray-500 mt-1">Full access</span>
              </Button>
              
              <Button
                variant={roleDialog.currentRole === UserRole.INSTRUCTOR ? "default" : "outline"}
                className="flex-col h-auto py-4"
              >
                <User className="h-6 w-6 mb-2 text-blue-600" />
                <span>Instructor</span>
                <span className="text-xs text-gray-500 mt-1">Create courses</span>
              </Button>
              
              <Button
                variant={roleDialog.currentRole === UserRole.STUDENT ? "default" : "outline"}
                className="flex-col h-auto py-4"
              >
                <User className="h-6 w-6 mb-2 text-green-600" />
                <span>Student</span>
                <span className="text-xs text-gray-500 mt-1">Learn courses</span>
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialog({...roleDialog, open: false})}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}