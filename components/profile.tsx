import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, Save } from "lucide-react"

export function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý hồ sơ cá nhân</h1>
        <p className="text-gray-600">Cập nhật thông tin và thiết lập quyền riêng tư</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Thông tin cá nhân
            </CardTitle>
            <CardDescription>Cập nhật thông tin cơ bản của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Họ</Label>
                <Input id="firstName" defaultValue="Nguyễn" />
              </div>
              <div>
                <Label htmlFor="lastName">Tên</Label>
                <Input id="lastName" defaultValue="Văn A" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="nguyenvana@email.com" />
            </div>

            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" defaultValue="0123456789" />
            </div>

            <div>
              <Label htmlFor="age">Tuổi</Label>
              <Input id="age" type="number" defaultValue="35" />
            </div>

            <div>
              <Label htmlFor="occupation">Nghề nghiệp</Label>
              <Input id="occupation" defaultValue="Kỹ sư phần mềm" />
            </div>

            <div>
              <Label htmlFor="bio">Giới thiệu bản thân</Label>
              <Textarea
                id="bio"
                placeholder="Chia sẻ về bản thân và mục tiêu cai thuốc..."
                defaultValue="Tôi đã hút thuốc 10 năm và quyết tâm cai thuốc để có sức khỏe tốt hơn cho gia đình."
              />
            </div>

            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Lưu thông tin
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Notifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Quyền riêng tư
              </CardTitle>
              <CardDescription>Thiết lập mức độ riêng tư cho hồ sơ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hiển thị hồ sơ công khai</Label>
                  <p className="text-sm text-gray-600">Cho phép người khác xem hồ sơ của bạn</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Hiển thị tiến trình</Label>
                  <p className="text-sm text-gray-600">Chia sẻ tiến trình cai thuốc với cộng đồng</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Cho phép tin nhắn</Label>
                  <p className="text-sm text-gray-600">Nhận tin nhắn từ thành viên khác</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Chế độ ẩn danh</Label>
                  <p className="text-sm text-gray-600">Tham gia forum và blog ẩn danh</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-600" />
                Thông báo
              </CardTitle>
              <CardDescription>Thiết lập cách nhận thông báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Thông báo Push</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Nhắc nhở hàng ngày</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tin nhắn từ Coach</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cập nhật cộng đồng</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <div>
                <Label>Thông báo Email</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Báo cáo tiến trình hàng tuần</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Thông báo từ Coach</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tin tức và mẹo hay</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <div>
                <Label>Thông báo SMS</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Nhắc nhở khẩn cấp</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cuộc hẹn với Coach</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notification-time">Thời gian nhắc nhở</Label>
                <Select defaultValue="morning">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Buổi sáng (8:00)</SelectItem>
                    <SelectItem value="afternoon">Buổi chiều (14:00)</SelectItem>
                    <SelectItem value="evening">Buổi tối (20:00)</SelectItem>
                    <SelectItem value="custom">Tùy chỉnh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
