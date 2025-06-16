"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Check, CreditCard, Smartphone, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { SocialAuth } from "./social-auth"

interface AuthFormsProps {
  mode: "login" | "register"
  onBack: () => void
  onSuccess: (userData?: any) => void
  onSwitchMode: () => void
  onForgotPassword?: () => void
}

export function AuthForms({ mode, onBack, onSuccess, onSwitchMode, onForgotPassword }: AuthFormsProps) {
  const [step, setStep] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState("free")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    age: "",
    agreeTerms: false,
    agreeNewsletter: false,
  })

  const [toolResults, setToolResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    // Check if user came from tools
    const savedResults = localStorage.getItem("toolResults")
    if (savedResults) {
      setToolResults(JSON.parse(savedResults))
      localStorage.removeItem("toolResults")
    }
  }, [])

  const packages = [
    {
      id: "free",
      name: "Miễn phí",
      price: "0đ",
      duration: "Vĩnh viễn",
      features: ["Theo dõi tiến trình cơ bản", "Tham gia cộng đồng", "Đọc blog và forum", "Công cụ đánh giá"],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "299,000đ",
      duration: "/tháng",
      features: [
        "Tất cả tính năng miễn phí",
        "Chat với coach chuyên nghiệp",
        "A.I. tư vấn không giới hạn",
        "Báo cáo chi tiết",
        "Hỗ trợ ưu tiên",
      ],
      popular: true,
    },
    {
      id: "vip",
      name: "VIP",
      price: "599,000đ",
      duration: "/tháng",
      features: [
        "Tất cả tính năng Premium",
        "Video call không giới hạn",
        "Coach cá nhân riêng",
        "Tư vấn chuyên sâu",
        "Hỗ trợ tức thì 24/7",
      ],
      popular: false,
    },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"
    }

    if (mode === "register") {
      if (!formData.fullName) {
        newErrors.fullName = "Họ tên là bắt buộc"
      }

      if (!formData.phone) {
        newErrors.phone = "Số điện thoại là bắt buộc"
      }

      if (!formData.age) {
        newErrors.age = "Tuổi là bắt buộc"
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
      }

      if (!formData.agreeTerms) {
        newErrors.terms = "Bạn phải đồng ý với điều khoản sử dụng"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      // Simulate social login
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const userData = {
        id: "social_" + Date.now(),
        email: `user@${provider}.com`,
        fullName: `${provider} User`,
        package: "free",
        joinDate: new Date().toISOString(),
        loginMethod: provider,
      }
      onSuccess(userData)
    } catch (error) {
      setErrors({ general: `Đăng nhập ${provider} thất bại` })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate login validation
      if (formData.email === "demo@example.com" && formData.password === "password123") {
        const userData = {
          id: "user_123",
          email: formData.email,
          fullName: "Demo User",
          package: "free",
          joinDate: new Date().toISOString(),
        }
        onSuccess(userData)
      } else {
        setErrors({ general: "Email hoặc mật khẩu không đúng" })
      }
    } catch (error) {
      setErrors({ general: "Đã có lỗi xảy ra. Vui lòng thử lại." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (step === 1) {
      if (!validateForm()) return
      setStep(2)
    } else if (step === 2) {
      if (selectedPackage === "free") {
        setIsLoading(true)
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500))

          const userData = {
            id: "user_" + Date.now(),
            ...formData,
            package: selectedPackage,
            toolResults: toolResults,
            joinDate: new Date().toISOString(),
          }
          onSuccess(userData)
        } catch (error) {
          setErrors({ general: "Đã có lỗi xảy ra. Vui lòng thử lại." })
        } finally {
          setIsLoading(false)
        }
      } else {
        setStep(3)
      }
    } else {
      // Payment step
      setIsLoading(true)
      try {
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const userData = {
          id: "user_" + Date.now(),
          ...formData,
          package: selectedPackage,
          toolResults: toolResults,
          paymentCompleted: true,
          joinDate: new Date().toISOString(),
        }
        onSuccess(userData)
      } catch (error) {
        setErrors({ general: "Thanh toán thất bại. Vui lòng thử lại." })
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (mode === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại trang chủ
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold">Cai Thuốc Lá</span>
              </div>
              <CardTitle>Đăng nhập</CardTitle>
              <CardDescription>Chào mừng bạn quay trở lại</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.general}
                  </p>
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
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
                  size="sm"
                  className="absolute right-0 top-6 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>
              <SocialAuth
                onGoogleLogin={() => handleSocialLogin("Google")}
                onFacebookLogin={() => handleSocialLogin("Facebook")}
                isLoading={isLoading}
              />
              <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
              <div className="text-center">
                <Button variant="link" className="text-sm" onClick={onForgotPassword}>
                  Quên mật khẩu?
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600">
                Chưa có tài khoản?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={onSwitchMode}>
                  Đăng ký ngay
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại trang chủ
        </Button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold">Cai Thuốc Lá</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Đăng ký tài khoản</h1>
          <p className="text-gray-600">Bắt đầu hành trình cai thuốc lá của bạn</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-green-600 text-white" : "bg-gray-200"}`}
            >
              {step > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-green-600 text-white" : "bg-gray-200"}`}
            >
              {step > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-green-600 text-white" : "bg-gray-200"}`}
            >
              3
            </div>
          </div>
        </div>

        {toolResults && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-800 mb-2">Kết quả đánh giá của bạn</h4>
              <div className="text-sm text-blue-700">
                {toolResults.addictionLevel && <p>Mức độ nghiện: {toolResults.addictionLevel}</p>}
                {toolResults.yearlyCost && <p>Chi phí hàng năm: {toolResults.yearlyCost.toLocaleString()}đ</p>}
                <p className="mt-2">Dữ liệu này sẽ được lưu vào hồ sơ của bạn sau khi đăng ký.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>Tạo tài khoản của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.general}
                  </p>
                </div>
              )}
              <div>
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  placeholder="Nguyễn Văn A"
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
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
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
              <div>
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
              <div>
                <Label htmlFor="age">Tuổi</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className={errors.age ? "border-red-500" : ""}
                />
                {errors.age && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.age}
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
                  size="sm"
                  className="absolute right-0 top-6 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  size="sm"
                  className="absolute right-0 top-6 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Tôi đồng ý với{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Điều khoản sử dụng
                    </Button>{" "}
                    và{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Chính sách bảo mật
                    </Button>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.terms}
                  </p>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.agreeNewsletter}
                    onCheckedChange={(checked) => handleInputChange("agreeNewsletter", checked as boolean)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Nhận email về mẹo cai thuốc và cập nhật sản phẩm
                  </Label>
                </div>
              </div>

              <Button className="w-full" onClick={handleRegister} disabled={!formData.agreeTerms || isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang xử lý...
                  </>
                ) : (
                  "Tiếp tục"
                )}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={onSwitchMode}>
                  Đăng nhập
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Chọn gói dịch vụ</h2>
              <p className="text-gray-600">Bạn có thể thay đổi gói bất cứ lúc nào</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`cursor-pointer transition-all ${
                    selectedPackage === pkg.id ? "ring-2 ring-green-500 border-green-500" : "hover:shadow-lg"
                  } ${pkg.popular ? "relative" : ""}`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-600 text-white">Phổ biến nhất</Badge>
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-xl mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-green-600 mb-4">
                      {pkg.price}
                      <span className="text-lg font-normal text-gray-600">{pkg.duration}</span>
                    </div>
                    <ul className="space-y-2 mb-6 text-left">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {selectedPackage === pkg.id && (
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Quay lại
              </Button>
              <Button onClick={handleRegister} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang xử lý...
                  </>
                ) : selectedPackage === "free" ? (
                  "Hoàn tất đăng ký"
                ) : (
                  "Tiếp tục thanh toán"
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Thanh toán</CardTitle>
              <CardDescription>
                Gói {packages.find((p) => p.id === selectedPackage)?.name} -{" "}
                {packages.find((p) => p.id === selectedPackage)?.price}
                {packages.find((p) => p.id === selectedPackage)?.duration}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.general}
                  </p>
                </div>
              )}
              <div>
                <Label>Phương thức thanh toán</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                    <CreditCard className="h-6 w-6 mb-1" />
                    <span className="text-sm">VNPay</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                    <Smartphone className="h-6 w-6 mb-1" />
                    <span className="text-sm">MoMo</span>
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Gói dịch vụ:</span>
                  <span>{packages.find((p) => p.id === selectedPackage)?.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Giá:</span>
                  <span>
                    {packages.find((p) => p.id === selectedPackage)?.price}
                    {packages.find((p) => p.id === selectedPackage)?.duration}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">{packages.find((p) => p.id === selectedPackage)?.price}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Quay lại
                </Button>
                <Button onClick={handleRegister} className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    "Thanh toán"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
