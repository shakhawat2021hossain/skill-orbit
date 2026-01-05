"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Home,
  Menu,
  Plus,
  Users,
  X,
  LayoutDashboard,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/shared/LogoutButton";

interface DashboardSidebarProps {
  userRole: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  userName: string;
}

export default function DashboardSidebar({ userRole, userName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Get navigation items based on role
  const getNavItems = () => {
    const commonItems = [];

    const instructorItems = [
      { label: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
      { label: "My Courses", href: "/instructor/dashboard/courses", icon: BookOpen },
      { label: "Create Course", href: "/instructor/dashboard/add-course", icon: Plus },
      { label: "Enrollments", href: "/instructor/dashboard/enrollments", icon: Users },
      // { label: "Analytics", href: "/instructor/dashboard/analytics", icon: BarChart3 },
      // { label: "Reviews", href: "/instructor/dashboard/reviews", icon: Star },
    ];

    const studentItems = [
      { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
      // { label: "My Learning", href: "/dashboard/learning", icon: BookOpen },
      { label: "Wishlist", href: "/dashboard/wishlist", icon: Star },
      // { label: "Certificates", href: "/dashboard/certificates", icon: Award },
      { label: "My Courses", href: "/dashboard/my-course", icon: ShoppingBag },
      // { label: "Progress", href: "/dashboard/student/progress", icon: Clock },
    ];

    const adminItems = [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "All Courses", href: "/admin/dashboard/courses", icon: BookOpen },
      { label: "User Management", href: "/admin/dashboard/users", icon: Users },
      // { label: "Instructors", href: "/admin/dashboard/instructors", icon: Shield },
      // { label: "Analytics", href: "/admin/dashboard/analytics", icon: BarChart3 },
      // { label: "Reports", href: "/admin/dashboard/reports", icon: FileText },
    ];

    switch (userRole) {
      case 'INSTRUCTOR':
        return [...instructorItems];
      case 'STUDENT':
        return [...studentItems];
      case 'ADMIN':
        return [...adminItems];
    }
  };

  const navItems = getNavItems();

  const isActive = (href: string) => {
    // Dashboard should not match nested routes
    if (
      href === "/instructor/dashboard" ||
      href === "/dashboard" ||
      href === "/admin/dashboard"
    ) {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(href + "/");
  };


  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r overflow-y-auto transition-transform duration-300 z-50 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="text-xl font-bold bg-linear-to-r">
            Skill Orbit
          </div>
        </div>



        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                  ? 'bg-linear-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <div className="ml-auto">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t mt-auto absolute bottom-0 w-full bg-white">
          <div className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}