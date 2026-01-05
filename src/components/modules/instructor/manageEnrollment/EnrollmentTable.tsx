
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
    Search,
    MoreVertical,
    Users,
    Lock,
    Unlock,
    Eye,
    Loader2
} from "lucide-react";

import { getEnrollments } from "@/services/instructor/getEnrollments";
import { IEnrollmentResponse } from "@/services/instructor/getEnrollments";
import { IEnrollment } from "@/types/course";



export default function EnrollmentTable({ data, meta }: IEnrollmentResponse) {
    const [enrollments, setEnrollments] = useState<Partial<IEnrollment>[]>(data ?? []);
    const [page, setPage] = useState(meta?.page ?? 1);
    const [limit] = useState(meta?.limit ?? 10);
    const [total, setTotal] = useState(meta?.total ?? (data?.length ?? 0));
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(total / limit);

    const loadPage = async (newPage: number) => {
        setLoading(true);
        const res = await getEnrollments(newPage, limit);
        if (res?.data) {
            setEnrollments(res.data);
            setTotal(res.meta.total);
            setPage(res.meta.page);
        }
        setLoading(false);
    };

    useEffect(() => {
        // already loaded first page
    }, []);
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = enrollments.filter(en => {
        const student = typeof en.studentId === 'object' ? (en.studentId as any).name ?? '' : (en.studentId as string ?? '');
        const studentEmail = typeof en.studentId === 'object' ? (en.studentId as any).email ?? '' : '';
        const course = typeof en.courseId === 'object' ? ((en.courseId as any).title ?? '') : (en.courseId as string ?? '');
        const term = searchTerm.toLowerCase();
        return (
            student.toLowerCase().includes(term) ||
            studentEmail.toLowerCase().includes(term) ||
            course.toLowerCase().includes(term)
        );
    });

    const togglePayment = (id?: string) => {
        if (!id) return;
        setEnrollments(prev => prev.map(e => e._id === id ? { ...e, paymentStatus: e.paymentStatus === 'PAID' ? 'UNPAID' : 'PAID' } : e));
        // TODO: call API to persist change
    };










    return (
        <>
            <Card className="mb-6">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by student or course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex items-center justify-end md:col-span-2">
                        <div className="text-sm text-gray-600">Showing {enrollments.length} of {total} enrollments</div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Enrollments</CardTitle>
                    <CardDescription>Manage enrollment records</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.length === 0 ? (
                                    <TableRow key="no-enrollments">
                                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">No enrollments found</TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((en, idx) => (
                                        <TableRow key={en._id ?? `en-${page}-${idx}`}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <Users className="h-5 w-5 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{typeof en.studentId === 'object' ? (en.studentId as any).name ?? 'Student' : (en.studentId as string ?? 'Student')}</div>
                                                        <div className="text-sm text-gray-500">{typeof en.studentId === 'object' ? (en.studentId as any).email ?? '' : ''}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{typeof en.courseId === 'object' ? (en.courseId as any).title ?? (en.courseId as any)._id : (en.courseId as string ?? 'Course')}</TableCell>
                                            <TableCell>{en.progress ?? 0}%</TableCell>
                                            <TableCell>
                                                <Badge className={en.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                                                    {en.paymentStatus ?? 'UNPAID'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{en.amountPaid}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <a href={`/instructor/enrollments/${en._id}`}><Eye className="h-4 w-4 mr-2" />View</a>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => togglePayment(en._id)}>
                                                            {en.paymentStatus === 'PAID' ? (<><Unlock className="h-4 w-4 mr-2"/>Mark Unpaid</>) : (<><Lock className="h-4 w-4 mr-2"/>Mark Paid</>)}
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

            <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">Page {page} of {totalPages} • {total} enrollments</p>

                <div className="flex gap-2">
                    <Button variant="outline" disabled={page === 1 || loading} onClick={() => loadPage(page - 1)}>Previous</Button>
                    <Button variant="outline" disabled={page === totalPages || loading} onClick={() => loadPage(page + 1)}>Next</Button>
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
