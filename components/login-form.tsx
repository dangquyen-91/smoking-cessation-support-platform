"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { SocialAuth } from "./social-auth";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/queries/user.query";
import { useToast } from "./ui/use-toast";

interface LoginFormProps {
    onBack: () => void;
    onSuccess: (userData?: any) => void;
    onSwitchMode: () => void;
    onForgotPassword?: () => void;
}

export function LoginForm({
    onBack,
    onSuccess,
    onSwitchMode,
    onForgotPassword,
}: LoginFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { mutateAsync: loginUser } = useLoginUser();
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleLogin = async () => {
        setIsLoading(true);
        setErrors({});

        if (!formData.email) {
            setErrors({ email: "Vui lòng nhập email" });
            setIsLoading(false);
            return;
        }
        if (!formData.password) {
            setErrors({ password: "Vui lòng nhập mật khẩu" });
            setIsLoading(false);
            return;
        }

        try {
            const [err, data] = await loginUser({
                username: formData.email,
                password: formData.password,
            });
            console.log("Login response:", { err, data });
            if (err) {
                setErrors({ api: "Email hoặc mật khẩu không đúng" });
                setIsLoading(false);
                alert(err);
                return;
            }

            localStorage.setItem("authToken", data.id);
            localStorage.setItem("userData", JSON.stringify(data));

            setIsLoading(false);
            onSuccess(data);
            router.push("/dashboard");
        } catch (error) {
            setErrors({ api: "Lỗi kết nối máy chủ" });
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Button
                    variant="outline"
                    onClick={onBack}
                    className="mb-4 flex items-center"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Quay lại trang chủ
                </Button>
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Heart className="h-8 w-8 text-green-600" />
                            <span className="text-xl font-bold">
                                Cai Thuốc Lá
                            </span>
                        </div>
                        <CardTitle>Đăng nhập</CardTitle>
                        <CardDescription>
                            Chào mừng bạn quay trở lại
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                }
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) =>
                                    handleInputChange(
                                        "password",
                                        e.target.value
                                    )
                                }
                                className={
                                    errors.password ? "border-red-500" : ""
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={
                                    showPassword
                                        ? "Ẩn mật khẩu"
                                        : "Hiện mật khẩu"
                                }
                                className="absolute right-2 top-8 h-8 w-8 flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </Button>
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            {onForgotPassword && (
                                <Button
                                    variant="link"
                                    type="button"
                                    onClick={onForgotPassword}
                                >
                                    Quên mật khẩu?
                                </Button>
                            )}
                        </div>
                        <SocialAuth
                            onGoogleLogin={() => {}}
                            onFacebookLogin={() => {}}
                            isLoading={isLoading}
                        />
                        <Button
                            className="w-full"
                            onClick={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                "Đăng nhập"
                            )}
                        </Button>
                        <div className="text-center text-sm mt-2">
                            Chưa có tài khoản?{" "}
                            <Button
                                variant="link"
                                type="button"
                                onClick={onSwitchMode}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
