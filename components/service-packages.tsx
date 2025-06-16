import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Package, Crown, Zap } from "lucide-react"

export function ServicePackages() {
  const packages = [
    {
      id: 1,
      name: "Gói Cơ Bản",
      price: "Miễn phí",
      duration: "Vĩnh viễn",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      popular: false,
      features: [
        "Theo dõi tiến trình cơ bản",
        "Ghi nhận hàng ngày",
        "Thống kê đơn giản",
        "Tham gia cộng đồng",
        "Đọc blog và forum",
        "Hỗ trợ qua email",
      ],
      limitations: ["Không có coach cá nhân", "Giới hạn A.I. tư vấn", "Không có video call"],
    },
    {
      id: 2,
      name: "Gói Premium",
      price: "299,000đ",
      duration: "/tháng",
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      popular: true,
      features: [
        "Tất cả tính năng gói Cơ bản",
        "Chat với coach chuyên nghiệp",
        "A.I. tư vấn không giới hạn",
        "Kế hoạch cá nhân hóa",
        "Báo cáo chi tiết hàng tuần",
        "Nhắc nhở thông minh",
        "Hỗ trợ ưu tiên 24/7",
      ],
      limitations: ["Giới hạn 2 buổi video call/tháng"],
    },
    {
      id: 3,
      name: "Gói VIP",
      price: "599,000đ",
      duration: "/tháng",
      icon: Crown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      popular: false,
      features: [
        "Tất cả tính năng gói Premium",
        "Video call không giới hạn",
        "Coach cá nhân riêng",
        "Kế hoạch dinh dưỡng chuyên biệt",
        "Theo dõi sức khỏe chuyên sâu",
        "Tư vấn tâm lý chuyên nghiệp",
        "Báo cáo y tế định kỳ",
        "Ưu tiên hỗ trợ tức thì",
      ],
      limitations: [],
    },
  ]

  const addOns = [
    {
      name: "Buổi tư vấn thêm",
      price: "150,000đ",
      description: "Video call 1:1 với coach chuyên nghiệp",
    },
    {
      name: "Báo cáo sức khỏe chuyên sâu",
      price: "200,000đ",
      description: "Phân tích chi tiết tình trạng sức khỏe",
    },
    {
      name: "Kế hoạch dinh dưỡng cá nhân",
      price: "250,000đ",
      description: "Chế độ ăn uống phù hợp khi cai thuốc",
    },
  ]

  const testimonials = [
    {
      name: "Anh Tuấn",
      package: "Gói VIP",
      rating: 5,
      comment: "Dịch vụ tuyệt vời! Coach rất tận tâm và chuyên nghiệp. Tôi đã cai thuốc thành công sau 3 tháng.",
    },
    {
      name: "Chị Hoa",
      package: "Gói Premium",
      rating: 5,
      comment: "A.I. tư vấn rất hữu ích, giúp tôi vượt qua những lúc khó khăn nhất.",
    },
    {
      name: "Anh Minh",
      package: "Gói Cơ bản",
      rating: 4,
      comment: "Bắt đầu với gói miễn phí, rất hài lòng với tính năng cộng đồng.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gói dịch vụ</h1>
        <p className="text-gray-600">Chọn gói dịch vụ phù hợp với nhu cầu của bạn</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`relative ${pkg.borderColor} ${pkg.popular ? "ring-2 ring-purple-500" : ""}`}>
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white">Phổ biến nhất</Badge>
              </div>
            )}

            <CardHeader className={`text-center ${pkg.bgColor}`}>
              <div className={`w-12 h-12 mx-auto ${pkg.bgColor} rounded-full flex items-center justify-center mb-4`}>
                <pkg.icon className={`h-6 w-6 ${pkg.color}`} />
              </div>
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="text-3xl font-bold">
                {pkg.price}
                <span className="text-lg font-normal text-gray-600">{pkg.duration}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2">✅ Bao gồm:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {pkg.limitations.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-600 mb-2">Giới hạn:</h4>
                  <ul className="space-y-1">
                    {pkg.limitations.map((limitation, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                className={`w-full ${
                  pkg.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                {pkg.price === "Miễn phí" ? "Sử dụng ngay" : "Đăng ký gói"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add-ons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            Dịch vụ bổ sung
          </CardTitle>
          <CardDescription>Nâng cao trải nghiệm với các dịch vụ chuyên biệt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {addOns.map((addon, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">{addon.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{addon.price}</span>
                  <Button size="sm" variant="outline">
                    Thêm vào
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>So sánh chi tiết các gói</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Tính năng</th>
                  <th className="text-center p-3">Cơ bản</th>
                  <th className="text-center p-3">Premium</th>
                  <th className="text-center p-3">VIP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Theo dõi tiến trình</td>
                  <td className="text-center p-3">
                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                  </td>
                  <td className="text-center p-3">
                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                  </td>
                  <td className="text-center p-3">
                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Chat với coach</td>
                  <td className="text-center p-3">-</td>
                  <td className="text-center p-3">
                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                  </td>
                  <td className="text-center p-3">
                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Video call</td>
                  <td className="text-center p-3">-</td>
                  <td className="text-center p-3">2 buổi/tháng</td>
                  <td className="text-center p-3">Không giới hạn</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">A.I. tư vấn</td>
                  <td className="text-center p-3">Giới hạn</td>
                  <td className="text-center p-3">Không giới hạn</td>
                  <td className="text-center p-3">Không giới hạn</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Coach cá nhân</td>
                  <td className="text-center p-3">-</td>
                  <td className="text-center p-3">-</td>
                  <td className="text-center p-3">
                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle>Đánh giá từ khách hàng</CardTitle>
          <CardDescription>Chia sẻ từ những người đã thành công</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Badge variant="secondary">{testimonial.package}</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">"{testimonial.comment}"</p>
                <p className="text-sm font-medium">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Câu hỏi thường gặp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Tôi có thể thay đổi gói dịch vụ không?</h4>
              <p className="text-sm text-gray-600">
                Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Phí sẽ được tính theo tỷ lệ.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Có cam kết thời gian tối thiểu không?</h4>
              <p className="text-sm text-gray-600">
                Không, bạn có thể hủy bất cứ lúc nào. Chúng tôi tính phí theo tháng.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Tôi có được hoàn tiền không?</h4>
              <p className="text-sm text-gray-600">
                Chúng tôi có chính sách hoàn tiền trong 7 ngày đầu nếu bạn không hài lòng.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
