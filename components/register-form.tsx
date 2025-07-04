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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertCircle,
    Eye,
    EyeOff,
    ArrowLeft,
    Heart,
    User,
    Mail,
    Phone,
    Lock,
    Calendar,
    Users,
} from "lucide-react";
import { useState } from "react";
import { SocialAuth } from "./social-auth";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "@/queries/user.query";

interface RegisterFormProps {
    onBack: () => void;
    onSuccess: (userData?: any) => void;
    onSwitchMode: () => void;
}

export function RegisterForm({
    onBack,
    onSuccess,
    onSwitchMode,
}: RegisterFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        fullName: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
        age: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username.trim()) {
            newErrors.username = "Vui lòng nhập tên đăng nhập";
        } else if (formData.username.length < 3) {
            newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Vui lòng nhập họ tên";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        if (!formData.password) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        }

        if (!formData.gender) {
            newErrors.gender = "Vui lòng chọn giới tính";
        }

        if (!formData.age) {
            newErrors.age = "Vui lòng nhập tuổi";
        } else {
            const ageNum = parseInt(formData.age);
            if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
                newErrors.age = "Tuổi phải từ 13 đến 120";
            }
        }

        return newErrors;
    };
    const { mutateAsync: register } = useRegisterUser();

    const handleRegister = async () => {
        setIsLoading(true);
        setErrors({});

        // Validate form
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const payload = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password,
                fullName: formData.fullName.trim(),
                phone: formData.phone.trim(),
                gender: formData.gender,
                age: parseInt(formData.age),
            };

            await register(payload);

            setIsLoading(false);
            router.push("/dashboard");
            onSuccess("");
        } catch (err) {
            setErrors({ api: "Lỗi kết nối máy chủ" });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <Button
                    variant="outline"
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại trang chủ
                </Button>

                <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="text-center pb-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                                <Heart className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Cai Thuốc Lá
                            </span>
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Đăng ký tài khoản
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Tạo tài khoản mới để bắt đầu hành trình cai thuốc lá
                            của bạn
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        {/* Username */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="username"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <User className="h-4 w-4 text-gray-500" />
                                Tên đăng nhập
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="username123"
                                value={formData.username}
                                onChange={(e) =>
                                    handleInputChange(
                                        "username",
                                        e.target.value
                                    )
                                }
                                className={`transition-all ${
                                    errors.username
                                        ? "border-red-500 focus:border-red-500"
                                        : "focus:border-green-500"
                                }`}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <Mail className="h-4 w-4 text-gray-500" />
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                }
                                className={`transition-all ${
                                    errors.email
                                        ? "border-red-500 focus:border-red-500"
                                        : "focus:border-green-500"
                                }`}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="fullName"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <User className="h-4 w-4 text-gray-500" />
                                Họ và tên
                            </Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Nguyễn Văn A"
                                value={formData.fullName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "fullName",
                                        e.target.value
                                    )
                                }
                                className={`transition-all ${
                                    errors.fullName
                                        ? "border-red-500 focus:border-red-500"
                                        : "focus:border-green-500"
                                }`}
                            />
                            {errors.fullName && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="phone"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <Phone className="h-4 w-4 text-gray-500" />
                                Số điện thoại
                            </Label>
                            <Input
                                id="phone"
                                placeholder="0123456789"
                                value={formData.phone}
                                onChange={(e) =>
                                    handleInputChange("phone", e.target.value)
                                }
                                className={`transition-all ${
                                    errors.phone
                                        ? "border-red-500 focus:border-red-500"
                                        : "focus:border-green-500"
                                }`}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Gender and Age Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="gender"
                                    className="text-sm font-medium flex items-center gap-2"
                                >
                                    <Users className="h-4 w-4 text-gray-500" />
                                    Giới tính
                                </Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(value) =>
                                        handleInputChange("gender", value)
                                    }
                                >
                                    <SelectTrigger
                                        className={`transition-all ${
                                            errors.gender
                                                ? "border-red-500"
                                                : "focus:border-green-500"
                                        }`}
                                    >
                                        <SelectValue placeholder="Chọn giới tính" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MALE">
                                            Nam
                                        </SelectItem>
                                        <SelectItem value="FEMALE">
                                            Nữ
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.gender && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.gender}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="age"
                                    className="text-sm font-medium flex items-center gap-2"
                                >
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    Tuổi
                                </Label>
                                <Input
                                    id="age"
                                    type="number"
                                    placeholder="25"
                                    min="13"
                                    max="120"
                                    value={formData.age}
                                    onChange={(e) =>
                                        handleInputChange("age", e.target.value)
                                    }
                                    className={`transition-all ${
                                        errors.age
                                            ? "border-red-500 focus:border-red-500"
                                            : "focus:border-green-500"
                                    }`}
                                />
                                {errors.age && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.age}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <Lock className="h-4 w-4 text-gray-500" />
                                Mật khẩu
                            </Label>
                            <div className="relative">
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
                                    className={`pr-10 transition-all ${
                                        errors.password
                                            ? "border-red-500 focus:border-red-500"
                                            : "focus:border-green-500"
                                    }`}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <Lock className="h-4 w-4 text-gray-500" />
                                Xác nhận mật khẩu
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "confirmPassword",
                                            e.target.value
                                        )
                                    }
                                    className={`pr-10 transition-all ${
                                        errors.confirmPassword
                                            ? "border-red-500 focus:border-red-500"
                                            : "focus:border-green-500"
                                    }`}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Register Button */}
                        <Button
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-6 transition-all duration-200 transform hover:scale-[1.02]"
                            onClick={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Đang đăng ký...
                                </>
                            ) : (
                                "Đăng ký tài khoản"
                            )}
                        </Button>

                        {/* API Error */}
                        {errors.api && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.api}
                                </p>
                            </div>
                        )}

                        {/* Switch to Login */}
                        <div className="text-center text-sm">
                            <span className="text-gray-600">
                                Đã có tài khoản?
                            </span>{" "}
                            <Button
                                variant="link"
                                type="button"
                                onClick={onSwitchMode}
                                className="p-0 text-green-600 hover:text-green-700 font-medium"
                            >
                                Đăng nhập ngay
                            </Button>
                        </div>

                        {/* Social Auth */}
                        <div className="pt-4">
                            <SocialAuth
                                onGoogleLogin={() => {}}
                                onFacebookLogin={() => {}}
                                isLoading={isLoading}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
