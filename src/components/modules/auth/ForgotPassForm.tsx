"use client";

import { forgotPass } from "@/services/auth/forgotPassword";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPassForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const res = await forgotPass({ email });
            console.log("ress", res)

            if (res?.success) {
                toast.success("Password reset link sent to your email");
                setEmail("");
                router.refresh();
            } else {
                toast.error(res?.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Forgot password failed:", error);
            toast.error("Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                </label>
                <div className="relative">
                    <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2.5 rounded-lg font-medium transition"
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>
        </form>
    );
};

export default ForgotPassForm;
