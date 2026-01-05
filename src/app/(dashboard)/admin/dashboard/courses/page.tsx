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
    MoreVertical,
    BookOpen,
    DollarSign,
    Users,
    Star,
    Clock,
    Trash2,
    Eye,
    TrendingUp,
    AlertTriangle,
    Loader2,
    FileText,
    RotateCcw
} from "lucide-react";
import { Category, ICourse } from "@/types/course";
import { updateDeleteOperation } from "@/services/course/deleteCourse";
import { getCoursesForAdmin } from "@/services/course/getCourses";

export default function AdminCourseManagementPage() {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");
    const [actionLoading, setActionLoading] = useState(false);

    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        course: ICourse | null;
    }>({ open: false, course: null });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const coursesData = await getCoursesForAdmin();
            setCourses(coursesData || []);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOrRestore = async () => {
        if (!deleteDialog.course) return;
        try {
            setActionLoading(true);
            await updateDeleteOperation(deleteDialog.course._id);
            setDeleteDialog({ open: false, course: null });
            fetchCourses();
        } catch (error) {
            console.error("Failed to update course:", error);
        } finally {
            setActionLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "all" || course.category === categoryFilter;

        const matchesPrice =
            priceFilter === "all" ||
            (priceFilter === "free" && course.price === 0) ||
            (priceFilter === "paid" && course.price > 0);

        return matchesSearch && matchesCategory && matchesPrice;
    });

    const categories = Array.from(new Set(courses.map(course => course.category)));

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const isRestore = deleteDialog.course?.isDeleted;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
                    <p className="text-gray-600 mt-1">Manage all courses on the platform</p>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-4 grid md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search courses, instructors..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map(category => (
                                    <SelectItem key={category} value={category as Category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={priceFilter} onValueChange={setPriceFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Price" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Courses</CardTitle>
                        <CardDescription>{filteredCourses.length} courses found</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCourses.map(course => (
                                    <TableRow
                                        key={course._id}
                                        className={course.isDeleted ? "bg-red-50 opacity-70" : ""}
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-20 rounded overflow-hidden shrink-0">
                                                    <img
                                                        src={course.thumbnail || "https://via.placeholder.com/80x45"}
                                                        alt={course.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-medium text-gray-900 truncate">{course.title}</div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                                        <span>{course.rating.average || 4.5}</span>
                                                        <Clock className="h-3 w-3 ml-2" />
                                                        <span>{Math.floor((course.totalDuration || 0) / 60)}h</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{course.instructor}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{course.category}</Badge>
                                        </TableCell>
                                        <TableCell>${course.price}</TableCell>
                                        <TableCell>{course.students?.length || 0}</TableCell>
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
                                                    <DropdownMenuItem>
                                                        <TrendingUp className="h-4 w-4 mr-2" />
                                                        View Analytics
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <FileText className="h-4 w-4 mr-2" />
                                                        Edit Course
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => setDeleteDialog({ open: true, course })}
                                                        className={course.isDeleted ? "text-green-600" : "text-red-600"}
                                                    >
                                                        {course.isDeleted ? (
                                                            <RotateCcw className="h-4 w-4 mr-2" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                        )}
                                                        {course.isDeleted ? "Restore Course" : "Delete Course"}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Delete / Restore Dialog */}
            <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, course: deleteDialog.course })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {isRestore ? <RotateCcw /> : <AlertTriangle className="text-red-600" />}
                            {isRestore ? "Restore Course" : "Delete Course"}
                        </DialogTitle>
                        <DialogDescription>
                            {isRestore
                                ? "This course will be restored and visible to students again."
                                : "This course will be hidden from students. You can restore it later."}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialog({ open: false, course: null })}>
                            Cancel
                        </Button>
                        <Button
                            variant={isRestore ? "default" : "destructive"}
                            onClick={handleDeleteOrRestore}
                            disabled={actionLoading}
                        >
                            {actionLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                            {isRestore ? "Restore Course" : "Delete Course"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
