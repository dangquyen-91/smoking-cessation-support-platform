import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Save } from "lucide-react"

export function Profile() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý hồ sơ cá nhân</h1>
        <p className="text-gray-600">Cập nhật thông tin và thiết lập quyền riêng tư</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Thông tin cá nhân
          </CardTitle>
          <CardDescription>Cập nhật thông tin cơ bản của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Tuổi</Label>
              <Input id="age" type="number" defaultValue="35" />
            </div>
            <div>
              <Label htmlFor="occupation">Nghề nghiệp</Label>
              <Input id="occupation" defaultValue="Kỹ sư phần mềm" />
            </div>
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
    </div>
  )
}
