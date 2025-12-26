import RegisterForm from "@/components/modules/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
                    <p className="text-gray-600 mt-2">Start your learning journey today</p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-2xl shadow-lg border p-8">
                    <RegisterForm />

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:text-blue-800"
                        >
                            Sign in here
                        </Link>
                    </div>
                </div>

               

                {/* Support Info */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact support</Link></p>
                    <p className="mt-1">By continuing, you agree to our <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms</Link> and <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link></p>
                </div>
            </div>
        </div>
    );
}