
"use client";

import { useEffect, useState } from "react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    MoreVertical,
    User,
    Mail,
    Lock,
    Unlock,
    Trash2,
    Eye,
    UserCog,
    CheckCircle,
    XCircle,
    Loader2,
    Shield
} from "lucide-react";

import { updateUser } from "@/services/user/updateUser";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";

interface Props {
    initialUsers: IUser[];
}

import { IUser, UserRole } from "@/types/user";
import { getUsers } from "@/services/user/getAllUser";

// ... your other imports remain same

interface Props {
    initialUsers: IUser[];
    initialMeta?: {
        page: number;
        limit: number;
        total: number;
    };
}

export default function UsersTable({ initialUsers, initialMeta }: Props) {
    const [users, setUsers] = useState(initialUsers);
    const [page, setPage] = useState(initialMeta?.page ?? 1);
    const [limit] = useState(initialMeta?.limit ?? 10);
    const [total, setTotal] = useState(initialMeta?.total ?? users.length);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(total / limit);

    const loadPage = async (newPage: number) => {
        setLoading(true);
        const res = await getUsers(newPage, limit);
        if (res?.data) {
            setUsers(res.data);
            setTotal(res.meta.total);
            setPage(res.meta.page);
        }
        setLoading(false);
    };

    useEffect(() => {
        // already loaded first page
    }, []);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const [roleDialog, setRoleDialog] = useState<{
        open: boolean;
        userId: string;
        userName: string;
        currentRole: UserRole;
    }>({
        open: false,
        userId: "",
        userName: "",
        currentRole: UserRole.STUDENT,
    });

    const openRoleDialog = (user: IUser) => {
        setRoleDialog({
            open: true,
            userId: user._id,
            userName: user.name,
            currentRole: user.role,
        });
    };


    const handleChangeRole = async (role: UserRole) => {
        if (!roleDialog.userId) return;

        try {
            await updateUser(roleDialog.userId, { role }); // call your API
            setUsers(prev =>
                prev.map(u =>
                    u._id === roleDialog.userId ? { ...u, role } : u
                )
            );
            setRoleDialog({ ...roleDialog, open: false }); // close modal
        } catch (error) {
            console.error("Failed to update role:", error);
        }
    };


    const handleBlockUser = async (userId: string, isBlocked: boolean) => {
        setUsers(prev =>
            prev.map(u =>
                u._id === userId ? { ...u, isBlocked: !isBlocked } : u
            )
        );
        try {
            await updateUser(userId, { isBlocked: !isBlocked });
        } catch {
            setUsers(initialUsers); // rollback on error
        }
    };

    const handleDeleteUser = async (user: IUser) => {
        setUsers(prev =>
            prev.map(u =>
                u._id === user._id ? { ...u, isDeleted: !u.isDeleted } : u
            )
        );
        try {
            await updateUser(user._id, { isDeleted: !user.isDeleted });
        } catch {
            setUsers(initialUsers); // rollback
        }
    };

    // Filter logic
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

    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center py-20">
    //             <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    //         </div>
    //     );
    // }

    return (
        <>
            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger><SelectValue placeholder="Filter by role" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value={UserRole.ADMIN}>Admins</SelectItem>
                            <SelectItem value={UserRole.INSTRUCTOR}>Instructors</SelectItem>
                            <SelectItem value={UserRole.STUDENT}>Students</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="blocked">Blocked</SelectItem>
                            <SelectItem value="deleted">Deleted</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
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
                                    filteredUsers.map(user => (
                                        <TableRow key={user._id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <User className="h-5 w-5 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Mail className="h-3 w-3" /> {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={
                                                    user.isDeleted ? "text-red-600 border-red-300" :
                                                        user.isBlocked ? "text-amber-600 border-amber-300" :
                                                            "text-green-600 border-green-300"
                                                }>
                                                    {user.isDeleted ? <XCircle className="h-3 w-3 mr-1" /> :
                                                        user.isBlocked ? <Lock className="h-3 w-3 mr-1" /> :
                                                            <CheckCircle className="h-3 w-3 mr-1" />}
                                                    {user.isDeleted ? "Deleted" : user.isBlocked ? "Blocked" : "Active"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{new Date(user.createdAt).toLocaleDateString("en-GB")}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openRoleDialog(user)}>
                                                            <UserCog className="h-4 w-4 mr-2" />
                                                            Change Role
                                                        </DropdownMenuItem>

                                                        {/* <DropdownMenuItem><UserCog className="h-4 w-4 mr-2" />Change Role</DropdownMenuItem> */}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className={user.isBlocked ? "text-green-600" : "text-amber-600"}
                                                            onClick={() => !user.isDeleted && handleBlockUser(user._id, !!user.isBlocked)}
                                                        >
                                                            {user.isBlocked ? <><Unlock className="h-4 w-4 mr-2" />Unblock</> :
                                                                <><Lock className="h-4 w-4 mr-2" />Block</>}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteUser(user)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            {user.isDeleted ? "Restore" : "Delete"}
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

            {/* Change Role Dialog */}
            <Dialog open={roleDialog.open} onOpenChange={(open) => setRoleDialog({ ...roleDialog, open })}>
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
                                onClick={() => handleChangeRole(UserRole.ADMIN)}
                            >
                                <Shield className="h-6 w-6 mb-2 text-red-600" />
                                <span>Admin</span>
                                <span className="text-xs text-gray-500 mt-1">Full access</span>
                            </Button>

                            <Button
                                variant={roleDialog.currentRole === UserRole.INSTRUCTOR ? "default" : "outline"}
                                className="flex-col h-auto py-4"
                                onClick={() => handleChangeRole(UserRole.INSTRUCTOR)}
                            >
                                <User className="h-6 w-6 mb-2 text-blue-600" />
                                <span>Instructor</span>
                                <span className="text-xs text-gray-500 mt-1">Create courses</span>
                            </Button>

                            <Button
                                variant={roleDialog.currentRole === UserRole.STUDENT ? "default" : "outline"}
                                className="flex-col h-auto py-4"
                                onClick={() => handleChangeRole(UserRole.STUDENT)}
                            >
                                <User className="h-6 w-6 mb-2 text-green-600" />
                                <span>Student</span>
                                <span className="text-xs text-gray-500 mt-1">Learn courses</span>
                            </Button>

                        </div>
                    </div>

                    <AlertDialogFooter>
                        <Button variant="outline" onClick={() => setRoleDialog({ ...roleDialog, open: false })}>
                            Cancel
                        </Button>
                    </AlertDialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">
                    Page {page} of {totalPages} • {total} users
                </p>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        disabled={page === 1 || loading}
                        onClick={() => loadPage(page - 1)}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        disabled={page === totalPages || loading}
                        onClick={() => loadPage(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
            {loading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            )}


        </>
    );
}
