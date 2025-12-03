"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormData, loginSchema } from "@/validation/auth";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginAction } from "@/services/auth/login";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const [state, formAction, isPending] = useActionState(loginAction, {
        success: false,
        message: "",
        errors: {}
    });
    console.log("state", state)

    useEffect(() => {
        if (state.success) {
            // console.log("success from useeff")
            toast.success(state.user?.message || "login success");
        }
        else if (!state.success) {
            toast.error(state.user?.message || "login Failed");
        }
    }, [state]);



    return (
        <>
            {/* Login Form */}
            <Form {...form}>
                <form action={formAction} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            placeholder="you@example.com"
                                            className="pl-10"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage>
                                    {state?.errors?.email?.[0]}
                                </FormMessage>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>Password</FormLabel>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-10 pr-10"
                                            {...field}
                                            disabled={isPending}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage>
                                    {state?.errors?.password?.[0]}
                                </FormMessage>
                            </FormItem>
                        )}
                    />


                    <Button
                        type="submit"
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <div className="flex items-center">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                <span className="ml-2">Signing in...</span>
                            </div>
                        ) : (
                            <>
                                Sign in
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default LoginForm;