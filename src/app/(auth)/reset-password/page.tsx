import { Suspense } from "react";
import ResetPasswordForm from "@/components/modules/auth/ResetPasswordForm";

export const metadata = {
  title: "Reset Password",
};

export default function ResetPassPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="w-full px-4">
        <div className="mx-auto max-w-xl bg-white p-8 rounded-lg shadow">
          <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
