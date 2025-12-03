import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = [
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
];

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="bg-white border-t">
            <div className="container mx-auto px-4 py-12">
                {/* Logo and Description */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        
                        <div className="text-xl font-bold text-gray-900">CourseMaster</div>
                    </div>
                    <p className="text-gray-600 max-w-md mb-6">
                        Transform your career with world-class courses from top instructors.
                    </p>

                    {/* Newsletter */}
                    <div className="w-full max-w-md mb-8">
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Subscribe for course updates
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    {footerLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-600 hover:text-blue-600"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mb-8">
                    {socialLinks.map((social) => (
                        <Button
                            key={social.label}
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-lg"
                            asChild
                        >
                            <Link href={social.href} aria-label={social.label}>
                                <social.icon className="h-4 w-4" />
                            </Link>
                        </Button>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm border-t pt-6">
                    <div className="mb-2">
                        © {new Date().getFullYear()} CourseMaster. All rights reserved.
                    </div>
                    <div className="flex justify-center gap-4">
                        <span>1M+ Students</span>
                        <span>•</span>
                        <span>5K+ Courses</span>
                        <span>•</span>
                        <span>4.9/5 Rating</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}