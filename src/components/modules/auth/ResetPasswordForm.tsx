"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPass } from "@/services/auth/resetPassword";
import { Key, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams?.get("id") || "";
  const token = searchParams?.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId || !token) {
      setError("Invalid or missing reset link parameters.");
    } else {
      setError("");
    }
  }, [userId, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userId || !token) {
      setError("Invalid reset link. Please use the link from your email.");
      return;
    }

    if (!form.password || !form.confirm) {
      setError("Please fill out both fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPass({ userId, token, password: form.password });
      if (res?.success) {
        toast.success("Password successfully reset. You can now login.");
        router.push("/login");
      } else {
        toast.error(res?.message || "Failed to reset password");
      }
    } catch (err: any) {
      console.error("Reset password failed:", err);
      toast.error(err?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Reset Password</h2>
        <p className="text-sm text-gray-500 mt-2">Set a new password for your account.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter new password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-gray-500">Must be at least 6 characters long</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input
          id="confirm"
          type="password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          placeholder="Confirm new password"
          required
        />
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
