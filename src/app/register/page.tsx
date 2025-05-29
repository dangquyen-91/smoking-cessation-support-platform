"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Check, Star, CreditCard, Smartphone } from "lucide-react"

export default function RegisterPage() {
  const [selectedPlan, setSelectedPlan] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const plans = [
    {
      id: "free",
      name: "Miễn Phí",
      price: "0đ",
      period: "mãi mãi",
      features: ["Công cụ đánh giá cơ bản", "Tính chi phí thuốc lá", "Đọc blog và forum", "Tài liệu hướng dẫn cơ bản"],
      popular: false,
    },
    {
      id: "premium",
      name: "Cao Cấp",
      price: "99,000đ",
      period: "tháng",
      features: [
        "Tất cả tính năng miễn phí",
        "Theo dõi tiến trình chi tiết",
        "Nhắc nhở và động viên",
        "Tư vấn trực tuyến",
        "Cộng đồng riêng tư",
        "Báo cáo tiến độ",
      ],
      popular: true,
    },
    {
      id: "vip",
      name: "VIP",
      price: "199,000đ",
      period: "tháng",
      features: [
        "Tất cả tính năng cao cấp",
        "Tư vấn 1-1 với chuyên gia",
        "Kế hoạch cá nhân hóa",
        "Hỗ trợ 24/7",
        "Liệu pháp thay thế",
        "Đảm bảo thành công",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Đăng Ký Tài Khoản</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chọn gói dịch vụ phù hợp và tạo tài khoản để bắt đầu hành trình cai thuốc lá của bạn.
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all ${
                  selectedPlan === plan.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-lg"
                } ${plan.popular ? "border-blue-500" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Phổ biến nhất
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    {plan.price}
                    <span className="text-sm text-gray-500">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Registration Form */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Tài Khoản</CardTitle>
                <CardDescription>Điền thông tin để tạo tài khoản mới</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Họ</Label>
                    <Input id="firstName" placeholder="Nguyễn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Tên</Label>
                    <Input id="lastName" placeholder="Văn A" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="0123456789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input id="password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thanh Toán</CardTitle>
                <CardDescription>
                  {selectedPlan === "free" ? "Gói miễn phí không cần thanh toán" : "Chọn phương thức thanh toán"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlan !== "free" && (
                  <>
                    <div className="space-y-2">
                      <Label>Phương thức thanh toán</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phương thức" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vnpay">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              VNPay
                            </div>
                          </SelectItem>
                          <SelectItem value="momo">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4" />
                              MoMo
                            </div>
                          </SelectItem>
                          <SelectItem value="banking">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              Chuyển khoản ngân hàng
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Tóm tắt đơn hàng</h4>
                      <div className="flex justify-between text-sm">
                        <span>Gói {plans.find((p) => p.id === selectedPlan)?.name}:</span>
                        <span>{plans.find((p) => p.id === selectedPlan)?.price}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>VAT (10%):</span>
                        <span>{selectedPlan === "premium" ? "9,900đ" : "19,900đ"}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Tổng cộng:</span>
                        <span>{selectedPlan === "premium" ? "108,900đ" : "218,900đ"}</span>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!selectedPlan || (selectedPlan !== "free" && !paymentMethod)}
                >
                  {selectedPlan === "free" ? "Tạo Tài Khoản Miễn Phí" : "Thanh Toán & Kích Hoạt"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Bằng cách đăng ký, bạn đồng ý với{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Chính sách bảo mật
                  </a>{" "}
                  của chúng tôi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
