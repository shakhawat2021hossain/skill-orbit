import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="max-w-7xl mx-auto sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* ================= COMPANY INFO ================= */}
                    <div className="md:col-span-2">
                        <div className="text-2xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
                            <Link href="/">
                                <h1>Skill Orbit</h1>
                            </Link>
                        </div>
                        <p className="text-muted-foreground max-w-md">
                            Revolutionizing learning with cutting-edge technology and
                            exceptional service for students and instructors.
                        </p>
                    </div>

                    {/* ================= QUICK LINKS ================= */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/courses"
                                    className="hover:text-primary transition-colors"
                                >
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-primary transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-primary transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ================= SUPPORT ================= */}
                    {/* Get in Touch */}
                    <div>
                        <h3 className="font-semibold mb-4">Get in Touch</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <a
                                    href="mailto:shakhawat.hossain.web@gmail.com"
                                    className="hover:text-primary transition-colors"
                                >
                                    shakhawat.hossain.web@gmail.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:shakhawat.hossain.official@gmail.com"
                                    className="hover:text-primary transition-colors"
                                >
                                    shakhawat.hossain.official@gmail.com
                                </a>
                            </li>
                            <li>
                                <span className="text-sm">
                                    Response time: within 24 hours
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* ================= BOTTOM BAR ================= */}
                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} SkillOrbit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
