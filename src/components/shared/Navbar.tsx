"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Search, Menu, User, BookOpen, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md transition-all ${
      isScrolled ? "shadow-sm" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              
              <div>
                <div className="text-xl font-bold">
                  CourseMaster
                </div>
                
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 ml-8">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  className={`${
                    pathname === link.href
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

          {/* Search and Auth */}
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

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* <Button variant="ghost" size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button> */}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              {/* <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button> */}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                {/* Sheet Title (Hidden for visual but accessible) */}
                <SheetTitle className="sr-only">Menu</SheetTitle>
                
                <div className="flex flex-col h-full py-6">
                  {/* Mobile Logo */}
                  <div className="px-4 mb-8">
                    <div className="text-xl font-bold text-gray-900">CourseMaster</div>
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
                        className={`flex items-center px-3 py-3 rounded-lg mb-1 ${
                          pathname === link.href
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
                    <div className="space-y-3">
                      <Button className="w-full" asChild>
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href="/register">Sign up free</Link>
                      </Button>
                    </div>
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