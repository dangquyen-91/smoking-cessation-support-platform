"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Eye, EyeOff, ArrowLeft, Heart } from "lucide-react"
import { useState } from "react"
import { SocialAuth } from "./social-auth"
import { useRouter } from "next/navigation"

interface RegisterFormProps {
  onBack: () => void
  onSuccess: (userData?: any) => void
  onSwitchMode: () => void
}

export function RegisterForm({ onBack, onSuccess, onSwitchMode }: RegisterFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async () => {
  setIsLoading(true)
  setErrors({})

  // Validate các trường ở FE trước khi gửi lên BE
  const newErrors: Record<string, string> = {};
  if (!formData.fullName) newErrors.fullName = "Vui lòng nhập họ tên";
  if (!formData.email) newErrors.email = "Vui lòng nhập email";
  if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
  if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
  if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setIsLoading(false);
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      setErrors(data.errors || { api: data.message || "Đăng ký thất bại" });
      setIsLoading(false);
      return;
    }

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    setIsLoading(false);
    router.push("/dashboard");
    onSuccess(data.user);
  } catch (err) {
    setErrors({ api: "Lỗi kết nối máy chủ" });
    setIsLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button variant="outline" onClick={onBack} className="mb-4 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại trang chủ
        </Button>
        <Card className="max-w-md mx-auto mt-10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold">Cai Thuốc Lá</span>
            </div>
            <CardTitle>Đăng ký</CardTitle>
            <CardDescription>Tạo tài khoản mới để bắt đầu hành trình</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
              <Label htmlFor="fullName">Họ tên</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Họ và tên"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.fullName}
                </p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                placeholder="0123456789"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.phone}
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
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute right-2 top-8 h-8 w-8 flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showConfirmPassword ? "Ẩn xác nhận mật khẩu" : "Hiện xác nhận mật khẩu"}
                className="absolute right-2 top-8 h-8 w-8 flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <Button className="w-full" onClick={handleRegister} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </Button>
            {errors.api && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.api}
              </p>
            )}
            <div className="text-center text-sm mt-2">
              Đã có tài khoản?{' '}
              <Button variant="link" type="button" onClick={onSwitchMode}>
                Đăng nhập
              </Button>
            </div>
            <SocialAuth
              onGoogleLogin={() => {}}
              onFacebookLogin={() => {}}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
