"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, TrendingUp, ArrowLeft, Cigarette } from "lucide-react"
import { useState, useEffect } from "react"

interface CostCalculatorProps {
  onBack: () => void
  onRegister: () => void
}

export function CostCalculator({ onBack, onRegister }: CostCalculatorProps) {
  const [formData, setFormData] = useState({
    cigarettesPerDay: "",
    costPerPack: "30000",
    cigarettesPerPack: "20",
    smokingYears: "",
  })

  const [results, setResults] = useState<any>(null)

  const calculateCosts = () => {
    const cigarettesPerDay = Number.parseInt(formData.cigarettesPerDay) || 0
    const costPerPack = Number.parseInt(formData.costPerPack) || 30000
    const cigarettesPerPack = Number.parseInt(formData.cigarettesPerPack) || 20
    const smokingYears = Number.parseInt(formData.smokingYears) || 0

    const costPerCigarette = costPerPack / cigarettesPerPack
    const dailyCost = cigarettesPerDay * costPerCigarette
    const weeklyCost = dailyCost * 7
    const monthlyCost = dailyCost * 30
    const yearlyCost = dailyCost * 365
    const lifetimeCost = yearlyCost * smokingYears

    // Future projections
    const next5Years = yearlyCost * 5
    const next10Years = yearlyCost * 10
    const next20Years = yearlyCost * 20

    // What you could buy instead
    const alternatives = [
      { item: "iPhone 15 Pro Max", price: 30000000, quantity: Math.floor(yearlyCost / 30000000) },
      { item: "Xe máy Honda Wave", price: 20000000, quantity: Math.floor(yearlyCost / 20000000) },
      { item: "Laptop gaming", price: 25000000, quantity: Math.floor(yearlyCost / 25000000) },
      { item: "Chuyến du lịch Đà Nẵng", price: 5000000, quantity: Math.floor(yearlyCost / 5000000) },
      { item: "Bữa ăn nhà hàng", price: 500000, quantity: Math.floor(yearlyCost / 500000) },
    ]

    setResults({
      dailyCost,
      weeklyCost,
      monthlyCost,
      yearlyCost,
      lifetimeCost,
      next5Years,
      next10Years,
      next20Years,
      alternatives: alternatives.filter((alt) => alt.quantity > 0),
      cigarettesPerDay,
      smokingYears,
    })
  }

  const handleRegisterWithResults = () => {
    if (results) {
      const toolData = {
        type: "cost-calculator",
        dailyCost: results.dailyCost,
        yearlyCost: results.yearlyCost,
        lifetimeCost: results.lifetimeCost,
        cigarettesPerDay: results.cigarettesPerDay,
        smokingYears: results.smokingYears,
        completedAt: new Date().toISOString(),
      }
      localStorage.setItem("toolResults", JSON.stringify(toolData))
    }
    onRegister()
  }

  useEffect(() => {
    if (formData.cigarettesPerDay && formData.smokingYears) {
      calculateCosts()
    }
  }, [formData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại trang chủ
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Máy tính chi phí hút thuốc</h1>
          <p className="text-gray-600">Xem bạn đã và sẽ chi bao nhiêu tiền cho thuốc lá</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Thông tin của bạn
              </CardTitle>
              <CardDescription>Nhập thông tin để tính toán chi phí</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cigarettes-per-day">Số điếu thuốc/ngày</Label>
                <Input
                  id="cigarettes-per-day"
                  type="number"
                  placeholder="Ví dụ: 15"
                  value={formData.cigarettesPerDay}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cigarettesPerDay: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="smoking-years">Số năm hút thuốc</Label>
                <Input
                  id="smoking-years"
                  type="number"
                  placeholder="Ví dụ: 10"
                  value={formData.smokingYears}
                  onChange={(e) => setFormData((prev) => ({ ...prev, smokingYears: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="cost-per-pack">Giá một gói thuốc (VNĐ)</Label>
                <Select
                  value={formData.costPerPack}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, costPerPack: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25000">25,000đ (Thuốc lá giá rẻ)</SelectItem>
                    <SelectItem value="30000">30,000đ (Thuốc lá phổ biến)</SelectItem>
                    <SelectItem value="35000">35,000đ (Thuốc lá cao cấp)</SelectItem>
                    <SelectItem value="40000">40,000đ (Thuốc lá nhập khẩu)</SelectItem>
                    <SelectItem value="50000">50,000đ+ (Thuốc lá đắt tiền)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cigarettes-per-pack">Số điếu/gói</Label>
                <Select
                  value={formData.cigarettesPerPack}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, cigarettesPerPack: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20 điếu (Tiêu chuẩn)</SelectItem>
                    <SelectItem value="10">10 điếu (Gói nhỏ)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateCosts} className="w-full">
                Tính toán chi phí
              </Button>
            </CardContent>
          </Card>

          {/* Current Costs */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-red-600" />
                  Chi phí hiện tại
                </CardTitle>
                <CardDescription>Số tiền bạn đang chi cho thuốc lá</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-red-600">{results.dailyCost.toLocaleString()}đ</div>
                    <div className="text-sm text-red-700">Hàng ngày</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-orange-600">{results.weeklyCost.toLocaleString()}đ</div>
                    <div className="text-sm text-orange-700">Hàng tuần</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-yellow-600">{results.monthlyCost.toLocaleString()}đ</div>
                    <div className="text-sm text-yellow-700">Hàng tháng</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-600">{results.yearlyCost.toLocaleString()}đ</div>
                    <div className="text-sm text-purple-700">Hàng năm</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-800">{results.lifetimeCost.toLocaleString()}đ</div>
                  <div className="text-sm text-gray-600">Tổng đã chi trong {results.smokingYears} năm</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cigarette className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {results.cigarettesPerDay} điếu/ngày = {(results.cigarettesPerDay * 365).toLocaleString()}{" "}
                      điếu/năm
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Future Projections */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Dự báo tương lai
                </CardTitle>
                <CardDescription>Nếu tiếp tục hút thuốc</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800">5 năm tới</div>
                    <div className="text-xl font-bold text-blue-600">{results.next5Years.toLocaleString()}đ</div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <div className="font-medium text-indigo-800">10 năm tới</div>
                    <div className="text-xl font-bold text-indigo-600">{results.next10Years.toLocaleString()}đ</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-800">20 năm tới</div>
                    <div className="text-xl font-bold text-purple-600">{results.next20Years.toLocaleString()}đ</div>
                  </div>
                </div>

                <div className="p-4 bg-red-100 rounded-lg">
                  <div className="text-sm text-red-800 font-medium mb-1">⚠️ Lưu ý</div>
                  <div className="text-sm text-red-700">
                    Giá thuốc lá có thể tăng theo thời gian do thuế và lạm phát
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* What You Could Buy Instead */}
        {results && results.alternatives.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Với số tiền hàng năm, bạn có thể mua...</CardTitle>
              <CardDescription>Những thứ có ích hơn với {results.yearlyCost.toLocaleString()}đ/năm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.alternatives.map((alt: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="font-medium text-gray-900">{alt.item}</div>
                    <div className="text-sm text-gray-600">{alt.price.toLocaleString()}đ</div>
                    <div className="text-lg font-bold text-green-600">
                      {alt.quantity} {alt.quantity > 1 ? "cái" : "cái"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Health Impact */}
        {results && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tác động đến sức khỏe</CardTitle>
              <CardDescription>Những con số đáng suy ngẫm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {Math.round((results.cigarettesPerDay * results.smokingYears * 365 * 5) / 60)} giờ
                  </div>
                  <div className="text-sm text-red-700">Thời gian "mất" do hút thuốc</div>
                  <div className="text-xs text-red-600 mt-1">(5 phút/điếu)</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(results.cigarettesPerDay * results.smokingYears * 365 * 0.1)} mg
                  </div>
                  <div className="text-sm text-orange-700">Tar đã hít vào phổi</div>
                  <div className="text-xs text-orange-600 mt-1">(0.1mg/điếu)</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.round(results.cigarettesPerDay * results.smokingYears * 365 * 0.8)} mg
                  </div>
                  <div className="text-sm text-yellow-700">Nicotine đã tiêu thụ</div>
                  <div className="text-xs text-yellow-600 mt-1">(0.8mg/điếu)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        {results && (
          <Card className="mt-6 bg-green-600 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Sẵn sàng tiết kiệm tiền và cải thiện sức khỏe?</h3>
              <p className="mb-4 opacity-90">
                Bắt đầu hành trình cai thuốc ngay hôm nay để tiết kiệm {results.yearlyCost.toLocaleString()}đ mỗi năm
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" onClick={handleRegisterWithResults}>
                  Đăng ký ngay - Lưu kết quả
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                  Tìm hiểu thêm
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
