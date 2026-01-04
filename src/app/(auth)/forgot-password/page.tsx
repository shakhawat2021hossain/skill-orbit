import ForgotPassForm from "@/components/modules/auth/ForgotPassForm";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {


    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Forgot Password</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Enter your registered email. We’ll send you a password reset link.
                    </p>
                </div>

                <ForgotPassForm />

                <div className="mt-6 text-center">
                    <a
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                        <ArrowLeft size={16} /> Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
}
