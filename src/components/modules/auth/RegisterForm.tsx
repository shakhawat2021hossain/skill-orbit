"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/types/auth";
import { useForm } from "react-hook-form";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAction } from "@/services/auth/register";

export default function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "STUDENT"
        },
    });

    const [state, formAction, isPending] = useActionState(registerAction, {
        success: false,
        message: "",
        errors: {}
    });

    console.log("state:", state)

    useEffect(() => {
        if (state.success) {
            toast.success(state.message || "Registration successful!");
            router.push("/login")
            
        } else if (state.message && !state.success) {
            toast.error(state.message || "Registration failed");
        }
    }, [state]);

    return (
        <>
            <Form {...form}>
                <form action={formAction} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            placeholder="John Doe"
                                            className="pl-10"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage>
                                    {state?.errors?.name?.[0]}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

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
                                <FormLabel>Password</FormLabel>
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



                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account type</FormLabel>
                                <FormControl>
                                    <div>
                                        <Tabs defaultValue={field.value || "STUDENT"} onValueChange={field.onChange}>
                                            <TabsList className="w-full">
                                                <TabsTrigger value="STUDENT">Student</TabsTrigger>
                                                <TabsTrigger value="INSTRUCTOR">Instructor</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                        <input type="hidden" {...field} />
                                    </div>
                                </FormControl>
                                <FormDescription>Choose a role to continue</FormDescription>
                                <FormMessage>
                                    {state?.errors?.role?.[0]}
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
                                <span className="ml-2">Creating account...</span>
                            </div>
                        ) : (
                            <>
                                Create Account
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </>
    );
}