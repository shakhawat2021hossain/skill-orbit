import EnrollmentTable from "@/components/modules/instructor/manageEnrollment/EnrollmentTable";
import { getEnrollments } from "@/services/instructor/getEnrollments";

export default async function GetEnrollmentPage() {
    const res = await getEnrollments(1, 5);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Enrollment Details</h1>
                    <p className="text-gray-600 mt-1">
                        Manage all users on the platform
                    </p>
                </div>

                <EnrollmentTable
                    data={res?.data ?? []}
                    meta={res?.meta ?? { page: 1, limit: 5, total: 0 }}
                />
            </div>
        </div>
    );
}


