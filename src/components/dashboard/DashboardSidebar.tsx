"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Home,
  LogOut,
  Menu,
  Plus,
  Settings,
  Users,
  X,
  Award,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  userRole: UserRole;
  userName: string;
}

export default function DashboardSidebar({ userRole, userName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getNavItems = (role: UserRole) => {
    const commonItems = [
      { label: "Dashboard", href: "/dashboard/dashboard", icon: Home },
      { label: "Profile", href: "/profile", icon: Settings },
    ];

    const instructorItems = [
      { label: "My Courses", href: "/dashboard/instructor/courses", icon: BookOpen },
      { label: "Add Course", href: "/dashboard/instructor/add-course", icon: Plus },
      { label: "Analytics", href: "/dashboard/instructor/analytics", icon: BarChart3 },
    ];

    const studentItems = [
      { label: "My Courses", href: "/dashboard/student/courses", icon: BookOpen },
      { label: "Certificates", href: "/dashboard/student/certificates", icon: Award },
      { label: "Wishlist", href: "/dashboard/student/wishlist", icon: BookOpen },
    ];

    const adminItems = [
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      { label: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
      { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
      { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ];

    if (role === UserRole.INSTRUCTOR) {
      return [...commonItems, ...instructorItems];
    } else if (role === UserRole.STUDENT) {
      return [...commonItems, ...studentItems];
    } else if (role === UserRole.ADMIN) {
      return [...commonItems, ...adminItems];
    }

    return commonItems;
  };

  const navItems = getNavItems(userRole);
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white overflow-y-auto transition-transform duration-300 z-40 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <Link href="/dashboard/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">Skill Orbit</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="font-bold">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{userName}</p>
              <p className="text-xs text-gray-400 capitalize">{userRole.toLowerCase()}</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800 absolute bottom-0 w-full">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
            asChild
          >
            <Link href="/logout">
              <LogOut size={20} className="mr-3" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
