"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Search, Menu, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { deleteCookie } from "../auth/handleToken";
import { IUser, UserRole } from "@/types/user";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const authenticatedRoutes = {
  STUDENT: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },

  ],
  INSTRUCTOR: [
    { name: "Dashboard", href: "/instructor/dashboard" },
    { name: "Profile", href: "/profile" },

  ],
  ADMIN: [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Profile", href: "/profile" },

  ],
}

export default function PublicNavbar({ accessToken, user }: { accessToken: string | null, user: IUser | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md transition-all ${isScrolled ? "shadow-sm" : ""
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-xl font-bold">skillorbit</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 ml-8">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  className={`${pathname === link.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                  asChild
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}
            </nav>
          </div>

          {/* Search + Auth */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-3">
              {!accessToken ? (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem> */}
                    {
                      user &&
                      authenticatedRoutes[user?.role].map(route => <DropdownMenuItem key={route.href} asChild>
                        <Link href={route.href}>{route.name}</Link>
                      </DropdownMenuItem>)
                    }
                    {/* <DropdownMenuItem asChild>
                      <Link href="/my-courses">My Courses</Link>
                    </DropdownMenuItem> */}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={async () => {
                        await deleteCookie("accessToken")
                        window.location.reload();
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px]">
                <SheetTitle className="sr-only">Menu</SheetTitle>

                <div className="flex flex-col h-full py-6">
                  {/* Mobile Logo */}
                  <div className="px-4 mb-8">
                    <div className="text-xl font-bold text-gray-900">skillorbit</div>
                  </div>

                  {/* Mobile Search */}
                  <div className="px-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 px-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center px-3 py-3 rounded-lg mb-1 ${pathname === link.href
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Auth */}
                  <div className="px-4 pt-6 border-t">
                    {!accessToken ? (
                      <div className="space-y-3">
                        <Button className="w-full" asChild>
                          <Link href="/login">Log in</Link>
                        </Button>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href="/register">Sign up free</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button className="w-full" asChild>
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <Button className="w-full" asChild>
                          <Link href="/profile">Profile</Link>
                        </Button>


                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={async () => {
                            await deleteCookie("accessToken")
                            window.location.reload();
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
