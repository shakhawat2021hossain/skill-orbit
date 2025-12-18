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
    FileText
} from "lucide-react";
import { ICourse } from "@/types/course";
import { getCourses } from "@/services/course/getCourses";

export default function AdminCourseManagementPage() {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [priceFilter, setPriceFilter] = useState<string>("all");

    // Dialog state
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean, courseId: string, courseTitle: string }>({
        open: false,
        courseId: "",
        courseTitle: ""
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const coursesData = await getCourses();
            setCourses(coursesData || []);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setLoading(false);
        }
    };

    // const handleDeleteCourse = async () => {
    //     try {
    //         await deleteCourse(deleteDialog.courseId);
    //         setDeleteDialog({ open: false, courseId: "", courseTitle: "" });
    //         fetchCourses();
    //     } catch (error) {
    //         console.error("Failed to delete course:", error);
    //     }
    // };

    // Filter courses
    const filteredCourses = courses.filter(course => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;

        const matchesPrice =
            priceFilter === "all" ||
            (priceFilter === "free" && course.price === 0) ||
            (priceFilter === "paid" && course.price > 0);

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Get unique categories for filter
    const categories = Array.from(new Set(courses.map(course => course.category)));

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="mt-2 text-gray-600">Loading courses...</p>
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
                            <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
                            <p className="text-gray-600 mt-1">Manage all courses on the platform</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                                {filteredCourses.length} courses
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
                                            placeholder="Search courses, instructors..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filter by category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Price Filter */}
                                <div>
                                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filter by price" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Courses</SelectItem>
                                            <SelectItem value="free">Free Courses</SelectItem>
                                            <SelectItem value="paid">Paid Courses</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Courses Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Courses</CardTitle>
                        <CardDescription>
                            Manage courses, view details, and delete courses
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
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
                                    {filteredCourses.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                                No courses found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredCourses.map((course) => (
                                            <TableRow key={course._id}>
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
                                                                <span>{course.rating || 4.5}</span>
                                                                <Clock className="h-3 w-3 ml-2" />
                                                                <span>{Math.floor((course.totalDuration || 0) / 60)}h</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm text-gray-900">{course.instructor}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{course.category}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="h-4 w-4 text-gray-500" />
                                                        <span className="font-semibold">${course.price}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4 text-gray-500" />
                                                        <span>{course.students?.length || 0}</span>
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
                                                                onClick={() => setDeleteDialog({
                                                                    open: true,
                                                                    courseId: course._id,
                                                                    courseTitle: course.title
                                                                })}
                                                                className="text-red-600"
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete Course
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

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Courses</p>
                                    <p className="text-2xl font-bold">{courses.length}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <BookOpen className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Students</p>
                                    <p className="text-2xl font-bold">
                                        {courses.reduce((sum, course) => sum + (course.students?.length || 0), 0)}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold">
                                        ${courses.reduce((sum, course) => sum + (course.price * (course.students?.length || 0)), 0).toFixed(2)}
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <DollarSign className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Avg Rating</p>
                                    <p className="text-2xl font-bold">
                                        {/* {(courses.reduce((sum, course) => sum + (parseFloat(course.rating || "4.5"), 0) / courses.length) || 0).toFixed(1)} */}
                                    </p>
                                </div>
                                <div className="p-3 bg-amber-100 rounded-lg">
                                    <Star className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="h-5 w-5" />
                            Delete Course
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <span className="font-semibold">{deleteDialog.courseTitle}</span>?
                            This action will permanently remove the course and all associated data including lessons, resources, and student progress.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}>
                            Cancel
                        </Button>
                        <Button variant="destructive"
                        //  onClick={handleDeleteCourse}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Course
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}