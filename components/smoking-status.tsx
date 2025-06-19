"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cigarette, Heart, AlertTriangle, Save, TrendingDown } from "lucide-react"
import { useState } from "react"

export function SmokingStatus() {
  const [cigarettesPerDay, setCigarettesPerDay] = useState("15")
  const [symptoms, setSymptoms] = useState("")
  const [healthStatus, setHealthStatus] = useState("")

  const handleSave = () => {
    // Save to database logic here
    alert("Đã lưu thông tin tình trạng hút thuốc!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ghi nhận tình trạng hút thuốc hiện tại</h1>
        <p className="text-gray-600">Nhập thông tin chi tiết để hệ thống có thể đưa ra gợi ý phù hợp</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Smoking Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cigarette className="h-5 w-5 text-red-600" />
              Thói quen hút thuốc
            </CardTitle>
            <CardDescription>Thông tin về thói quen hút thuốc hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cigarettes-per-day">Số điếu thuốc/ngày</Label>
              <Input
                id="cigarettes-per-day"
                type="number"
                value={cigarettesPerDay}
                onChange={(e) => setCigarettesPerDay(e.target.value)}
                placeholder="Ví dụ: 15"
              />
              <p className="text-sm text-gray-600 mt-1">Số điếu thuốc bạn hút trung bình mỗi ngày</p>
            </div>

            <div>
              <Label htmlFor="smoking-years">Số năm hút thuốc</Label>
              <Input id="smoking-years" type="number" defaultValue="10" />
            </div>

            <div>
              <Label htmlFor="brand">Thương hiệu thuốc lá</Label>
              <Input id="brand" defaultValue="Marlboro" />
            </div>

            <div>
              <Label htmlFor="first-cigarette">Thời gian hút điếu đầu tiên</Label>
              <Select defaultValue="morning">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Ngay khi thức dậy</SelectItem>
                  <SelectItem value="morning">Trong vòng 30 phút</SelectItem>
                  <SelectItem value="hour">Sau 1 giờ</SelectItem>
                  <SelectItem value="later">Muộn hơn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="triggers">Tình huống thường hút thuốc</Label>
              <Textarea
                id="triggers"
                placeholder="Ví dụ: Khi căng thẳng, sau bữa ăn, khi uống cà phê..."
                defaultValue="Khi căng thẳng công việc, sau bữa ăn, khi uống cà phê với bạn bè"
              />
            </div>

            <div>
              <Label htmlFor="cost-per-pack">Giá tiền một gói (VNĐ)</Label>
              <Input id="cost-per-pack" type="number" defaultValue="30000" />
            </div>
          </CardContent>
        </Card>

        {/* Health Status & Symptoms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              Tình trạng sức khỏe
            </CardTitle>
            <CardDescription>Ghi nhận các triệu chứng và tình trạng sức khỏe hiện tại</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="symptoms">Triệu chứng hiện tại</Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Ví dụ: Ho khan, khó thở, mệt mỏi..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="health-concerns">Mối quan tâm về sức khỏe</Label>
              <Textarea
                id="health-concerns"
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value)}
                placeholder="Ví dụ: Lo lắng về ung thư phổi, bệnh tim..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="fitness-level">Mức độ thể lực</Label>
              <Select defaultValue="poor">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Xuất sắc</SelectItem>
                  <SelectItem value="good">Tốt</SelectItem>
                  <SelectItem value="average">Trung bình</SelectItem>
                  <SelectItem value="poor">Kém</SelectItem>
                  <SelectItem value="very-poor">Rất kém</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="medical-conditions">Bệnh lý hiện tại</Label>
              <Textarea id="medical-conditions" placeholder="Ví dụ: Cao huyết áp, tiểu đường, hen suyễn..." />
            </div>

            <div>
              <Label htmlFor="medications">Thuốc đang sử dụng</Label>
              <Textarea id="medications" placeholder="Liệt kê các loại thuốc bạn đang sử dụng..." />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-blue-600" />
            Thống kê nhanh
          </CardTitle>
          <CardDescription>Tác động của thói quen hút thuốc hiện tại</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Chi phí hàng tháng</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {(((Number.parseInt(cigarettesPerDay) * 30000) / 20) * 30).toLocaleString()}đ
              </div>
              <p className="text-sm text-red-700">Dựa trên {cigarettesPerDay} điếu/ngày</p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Cigarette className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-800">Điếu thuốc/năm</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {(Number.parseInt(cigarettesPerDay) * 365).toLocaleString()}
              </div>
              <p className="text-sm text-orange-700">Tổng số điếu trong năm</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Thời gian "mất"</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round(((Number.parseInt(cigarettesPerDay) * 5) / 60) * 10) / 10}h
              </div>
              <p className="text-sm text-yellow-700">Mỗi ngày (5 phút/điếu)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Lưu thông tin
        </Button>
      </div>
    </div>
  )
}
