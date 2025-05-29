"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DollarSign, TrendingUp, Calendar } from "lucide-react"

export default function CostCalculatorPage() {
  const [cigarettesPerDay, setCigarettesPerDay] = useState("")
  const [costPerPack, setCostPerPack] = useState("")
  const [cigarettesPerPack, setCigarettesPerPack] = useState("20")
  const [errors, setErrors] = useState<{ cigarettes?: string; cost?: string }>({})
  const [result, setResult] = useState<{
    daily: number
    weekly: number
    monthly: number
    yearly: number
  } | null>(null)

  const validateInputs = () => {
    const newErrors: typeof errors = {}
    const cigarettes = Number(cigarettesPerDay)
    const cost = Number(costPerPack)

    if (!cigarettesPerDay || isNaN(cigarettes) || cigarettes < 1 || cigarettes > 60) {
      newErrors.cigarettes = "Vui lòng nhập số điếu từ 1 đến 60."
    }

    if (!costPerPack || isNaN(cost) || cost < 1000 || cost > 200000) {
      newErrors.cost = "Vui lòng nhập giá hợp lệ (từ 1.000 đến 200.000 VNĐ)."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateCost = () => {
    if (!validateInputs()) return

    const cigarettes = Number(cigarettesPerDay)
    const packCost = Number(costPerPack)
    const packsSize = Number(cigarettesPerPack)

    const dailyCost = (cigarettes / packsSize) * packCost
    const weeklyCost = dailyCost * 7
    const monthlyCost = dailyCost * 30
    const yearlyCost = dailyCost * 365

    setResult({
      daily: dailyCost,
      weekly: weeklyCost,
      monthly: monthlyCost,
      yearly: yearlyCost,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Công Cụ Tính Chi Phí Thuốc Lá</CardTitle>
              <CardDescription>
                Tính toán chi phí tiêu thụ thuốc lá của bạn theo thời gian. Kết quả chỉ hiển thị tạm thời và không được lưu trữ.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cigarettes">Số điếu/ngày</Label>
                  <Input
                    id="cigarettes"
                    type="number"
                    placeholder="Ví dụ: 10"
                    value={cigarettesPerDay}
                    onChange={(e) => setCigarettesPerDay(e.target.value)}
                  />
                  {errors.cigarettes && (
                    <p className="text-sm text-red-600">{errors.cigarettes}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pack-cost">Giá/gói (VNĐ)</Label>
                  <Input
                    id="pack-cost"
                    type="number"
                    placeholder="Ví dụ: 25000"
                    value={costPerPack}
                    onChange={(e) => setCostPerPack(e.target.value)}
                  />
                  {errors.cost && (
                    <p className="text-sm text-red-600">{errors.cost}</p>
                  )}
                </div>

                <div className="space-y-2">                  <Label htmlFor="pack-size">Số điếu/gói</Label>
                  <Select value={cigarettesPerPack} onValueChange={setCigarettesPerPack}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn số điếu/gói" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 điếu</SelectItem>
                      <SelectItem value="20">20 điếu</SelectItem>
                      <SelectItem value="25">25 điếu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateCost} className="w-full">
                Tính Chi Phí
              </Button>
            </CardContent>
          </Card>

          {result && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Chi phí hàng ngày</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(result.daily)}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Chi phí hàng tuần</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(result.weekly)}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Chi phí hàng tháng</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(result.monthly)}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Chi phí hàng năm</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-700">{formatCurrency(result.yearly)}</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-green-600">Tiết Kiệm Khi Cai Thuốc</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Nếu bạn cai thuốc thành công, bạn có thể tiết kiệm được:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800">Sau 1 năm</h4>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(result.yearly)}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800">Sau 5 năm</h4>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(result.yearly * 5)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
