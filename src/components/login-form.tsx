"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/loginSchema";
import type { LoginSchema } from "@/schema/loginSchema";

import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();

    const { mutateAsync, isPending } = useLogin();
    const [serverError, setServerError] = useState<string | null>(null);

    const onSubmit = async (data: LoginSchema) => {
        setServerError(null);
        try {
            const res = await mutateAsync(data); // res: { success, message, token, data }

            // Simpan token dan user info
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.data));

            // Redirect berdasarkan role
            const role = res.data.role;
            if (role === "admin" || role === "moderator") {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (err: any) {
            setServerError(err.message || "Login gagal");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="items-center">
                                <img src="/assets/logo-swid.png" className="w-32" alt="" />
                            </div>
                            <div className="flex flex-col ">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your account
                                </p>
                            </div>

                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="your password"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Server Error */}
                            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

                            <a
                                href="#"
                                className="ml-auto text-sm underline-offset-2 hover:underline"
                            >
                                Forgot your password?
                            </a>

                            <Button
                                type="submit"
                                className="w-full bg-primary-0 hover:bg-primary-100"
                                disabled={isPending}
                            >
                                {isPending ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                    <div className="relative hidden md:flex items-center justify-center">
                        <img
                            src="/assets/login.jpg"
                            alt="Image"
                            className="w-full max-w-sm object-contain"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
