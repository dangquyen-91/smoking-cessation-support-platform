"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function AssessmentPage() {
  const [cigarettesPerDay, setCigarettesPerDay] = useState("")
  const [frequency, setFrequency] = useState("")
  const [costPerPack, setCostPerPack] = useState("")
  const [errors, setErrors] = useState<{ cigarettes?: string; cost?: string; frequency?: string }>({})
  const [result, setResult] = useState<{
    level: string
    description: string
    color: string
    icon: React.ReactNode
  } | null>(null)

  const validateInputs = () => {
    const newErrors: typeof errors = {}
    const cigarettes = Number(cigarettesPerDay)
    const cost = Number(costPerPack)

    if (!cigarettesPerDay || isNaN(cigarettes) || cigarettes < 1 || cigarettes > 60) {
      newErrors.cigarettes = "Vui lòng nhập số điếu từ 1 đến 60."
    }

    if (!frequency) {
      newErrors.frequency = "Vui lòng chọn tần suất hút thuốc."
    }

    if (!costPerPack || isNaN(cost) || cost < 1000 || cost > 200000) {
      newErrors.cost = "Vui lòng nhập giá hợp lệ (từ 1.000 đến 200.000 VNĐ)."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateAddictionLevel = () => {    if (!validateInputs()) return

    const cigarettes = Number(cigarettesPerDay)
    let score = 0

    // Điểm số dựa trên số lượng thuốc hút mỗi ngày
    if (cigarettes <= 5) score += 1
    else if (cigarettes <= 10) score += 2
    else if (cigarettes <= 20) score += 3
    else score += 4

    // Điểm số dựa trên tần suất hút
    if (frequency === "occasional") score += 1
    else if (frequency === "daily") score += 2
    else if (frequency === "multiple") score += 3

    let level, description, color, icon

    if (score <= 3) {
      level = "Mức độ thấp"
      description = "Bạn có thể cai thuốc tương đối dễ dàng với ý chí và một số hỗ trợ cơ bản."
      color = "text-green-600"
      icon = <CheckCircle className="h-6 w-6 text-green-600" />
    } else if (score <= 5) {
      level = "Mức độ trung bình"
      description = "Bạn cần có kế hoạch cụ thể và có thể cần hỗ trợ chuyên nghiệp để cai thuốc thành công."
      color = "text-yellow-600"
      icon = <AlertCircle className="h-6 w-6 text-yellow-600" />
    } else {
      level = "Mức độ cao"
      description = "Bạn nên tìm kiếm sự hỗ trợ chuyên nghiệp và có thể cần liệu pháp thay thế nicotine."
      color = "text-red-600"
      icon = <XCircle className="h-6 w-6 text-red-600" />
    }

    setResult({ level, description, color, icon })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Đánh Giá Mức Độ Nghiện Thuốc Lá</CardTitle>
              <CardDescription>
                Nhập thông tin của bạn để đánh giá mức độ nghiện thuốc lá. Kết quả chỉ hiển thị tạm thời và không được lưu trữ.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cigarettes">Số điếu thuốc hút mỗi ngày</Label>
                <Input
                  id="cigarettes"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={60}
                  placeholder="Từ 1 đến 60"
                  value={cigarettesPerDay}
                  onChange={(e) => setCigarettesPerDay(e.target.value)}
                />
                {errors.cigarettes && <p className="text-sm text-red-600">{errors.cigarettes}</p>}
              </div>

              <div className="space-y-2">                
                <Label htmlFor="frequency">Tần suất hút thuốc</Label>
                <Select value={frequency} onValueChange={(value) => setFrequency(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn tần suất" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="occasional">Thỉnh thoảng</SelectItem>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="multiple">Nhiều lần trong ngày</SelectItem>
                  </SelectContent>
                </Select>
                {errors.frequency && <p className="text-sm text-red-600">{errors.frequency}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Giá tiền một gói thuốc (VNĐ)</Label>
                <Input
                  id="cost"
                  type="number"
                  inputMode="numeric"
                  min={1000}
                  max={200000}
                  step={1000}
                  placeholder="Ví dụ: 25000"
                  value={costPerPack}
                  onChange={(e) => setCostPerPack(e.target.value)}
                />
                {errors.cost && <p className="text-sm text-red-600">{errors.cost}</p>}
              </div>

              <Button onClick={calculateAddictionLevel} className="w-full">
                Đánh Giá Mức Độ Nghiện
              </Button>

              {result && (
                <Card className="mt-6">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {result.icon}
                      <CardTitle className={result.color}>Kết quả: {result.level}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{result.description}</p>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Lưu ý:</strong> Kết quả này chỉ mang tính chất tham khảo. Để có đánh giá chính xác hơn,
                        bạn nên tham khảo ý kiến bác sĩ chuyên khoa.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
