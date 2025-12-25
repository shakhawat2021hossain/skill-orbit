import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";
import { getUserInfo } from "@/services/user/getUser";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar userRole={user.role} userName={user.name} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
