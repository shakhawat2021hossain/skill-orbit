import LoginForm from "@/components/modules/auth/LoginForm";
import Link from "next/link";


export default function LoginPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Logo */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account to continue learning</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-lg border p-8">


                    <LoginForm />

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-blue-600 hover:text-blue-800"
                        >
                            Sign up for free
                        </Link>
                    </div>
                </div>

                {/* Support Info */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact support</Link></p>
                    <p className="mt-1">By continuing, you agree to our <Link href="/" className="text-blue-600 hover:text-blue-800">Terms</Link> and <Link href="/" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link></p>
                </div>
            </div>
        </div>
    );
}