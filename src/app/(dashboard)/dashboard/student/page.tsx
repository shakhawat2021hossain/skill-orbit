import StudentDashboard from "@/components/modules/student/StudentDashboard";
import { getUserMetadata } from "@/services/metadata/userData";

export default async function DashboardPage() {
  const metadata = await getUserMetadata();

  return <StudentDashboard metadata={metadata} />;
}
