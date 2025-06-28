"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Calculator,
  FileText,
  BookOpen,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Bot,
  Users,
} from "lucide-react";
import type { HomePageProps } from "@/types/components";

export function HomePage({
  onAssessment,
  onCostCalculator,
  onResources,
  onCommunity,
  onRegister,
  onLogin,
}: HomePageProps) {
  const harmfulEffects = [
    {
      title: "Ung thư phổi",
      description: "Nguy cơ tăng 15-30 lần",
      icon: "🫁",
    },
    {
      title: "Bệnh tim mạch",
      description: "Tăng 2-4 lần nguy cơ đột quỵ",
      icon: "❤️",
    },
    {
      title: "Lão hóa da",
      description: "Da nhăn nheo, mất độ đàn hồi",
      icon: "👴",
    },
    {
      title: "Giảm tuổi thọ",
      description: "Trung bình giảm 10-15 năm",
      icon: "⏰",
    },
  ];

  const benefits = [
    { time: "20 phút", effect: "Nhịp tim và huyết áp bình thường" },
    { time: "12 giờ", effect: "Lượng CO trong máu giảm" },
    { time: "2-3 tuần", effect: "Tuần hoàn máu cải thiện" },
    { time: "1-9 tháng", effect: "Giảm ho và khó thở" },
    { time: "1 năm", effect: "Nguy cơ bệnh tim giảm 50%" },
  ];

  const tools = [
    {
      title: "Đánh giá mức độ nghiện",
      description: "Kiểm tra mức độ phụ thuộc nicotine",
      icon: Calculator,
      bgColor: "bg-blue-50",
      color: "text-blue-600",
      onClick: onAssessment,
    },
    {
      title: "Tính số tiền tiết kiệm",
      description: "Xem bạn tiết kiệm được bao nhiêu tiền",
      icon: FileText,
      bgColor: "bg-orange-50",
      color: "text-orange-600",
      onClick: onCostCalculator,
    },
    {
      title: "Nhật ký cai thuốc",
      description: "Ghi lại cảm xúc và tiến trình hàng ngày",
      icon: BookOpen,
      bgColor: "bg-purple-50",
      color: "text-purple-600",
      onClick: onResources,
    },
  ];

  const packages = [
    {
      name: "Miễn phí",
      price: "0đ",
      features: ["Theo dõi tiến trình", "Hỗ trợ cộng đồng"],
    },
    {
      name: "Cơ bản",
      price: "99.000đ/tháng",
      features: ["Tất cả tính năng miễn phí", "A.I. tư vấn 24/7"],
      popular: true,
    },
    {
      name: "Nâng cao",
      price: "199.000đ/tháng",
      features: ["Tất cả tính năng cơ bản", "Coach chuyên nghiệp 1-1"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Cai Thuốc Lá
                </h1>
                <p className="text-xs text-gray-600">Sức khỏe là vàng</p>
              </div>
            </div>
            {/* Header buttons */}
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onLogin}>
                Đăng nhập
              </Button>
              <Button
                onClick={onRegister}
                className="bg-green-600 hover:bg-green-700"
              >
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hành trình cai thuốc lá
            <span className="text-green-600"> thành công</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ứng dụng hỗ trợ cai thuốc lá toàn diện với công nghệ A.I., huấn
            luyện viên chuyên nghiệp và cộng đồng hỗ trợ tích cực
          </p>
          {/* Hero section buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onRegister}
              className="bg-green-600 hover:bg-green-700"
            >
              Bắt đầu ngay - Miễn phí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={onAssessment}>
              Đánh giá mức độ nghiện
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">10,000+</div>
              <div className="text-gray-600">Người đã cai thành công</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">Tỷ lệ hài lòng</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600">Coach chuyên nghiệp</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Hỗ trợ liên tục</div>
            </div>
          </div>
        </div>
      </section>

      {/* Harmful Effects */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tác hại của thuốc lá
            </h2>
            <p className="text-gray-600">
              Hiểu rõ tác hại để có động lực cai thuốc
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {harmfulEffects.map((effect, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{effect.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {effect.title}
                  </h3>
                  <p className="text-sm text-gray-600">{effect.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Timeline */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lợi ích khi ngừng hút thuốc
            </h2>
            <p className="text-gray-600">Cơ thể bạn sẽ phục hồi nhanh chóng</p>
          </div>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-4 bg-green-50 rounded-lg"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-green-800 text-lg">
                    {benefit.time}
                  </div>
                  <div className="text-gray-700">{benefit.effect}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Công cụ hỗ trợ miễn phí
            </h2>
            <p className="text-gray-600">
              Thử ngay các công cụ đánh giá và tính toán
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={tool.onClick}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${tool.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <Button variant="outline" className="w-full">
                    Thử ngay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cộng đồng hỗ trợ
            </h2>
            <p className="text-gray-600">
              Kết nối với những người cùng hành trình
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Community preview section */}
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={onResources}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Blog</h3>
                    <p className="text-gray-600">
                      Chia sẻ kinh nghiệm và lời khuyên
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 500+ bài viết từ chuyên gia</div>
                  <div>• Câu chuyện thành công thực tế</div>
                  <div>• Mẹo và thủ thuật hữu ích</div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Đọc Blog
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={onCommunity}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Forum</h3>
                    <p className="text-gray-600">
                      Thảo luận và hỗ trợ lẫn nhau
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 1000+ thành viên tích cực</div>
                  <div>• Hỏi đáp và chia sẻ kinh nghiệm</div>
                  <div>• Hỗ trợ 24/7 từ cộng đồng</div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Xem Forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chọn gói phù hợp
            </h2>
            <p className="text-gray-600">Bắt đầu miễn phí, nâng cấp khi cần</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${
                  pkg.popular ? "ring-2 ring-green-500" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white">
                      Phổ biến nhất
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-green-600 mb-4">
                    {pkg.price}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Package selection buttons */}
                  <Button
                    className={`w-full ${
                      pkg.popular ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={onRegister}
                  >
                    {pkg.name === "Miễn phí" ? "Bắt đầu ngay" : "Chọn gói"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Câu chuyện thành công
            </h2>
            <p className="text-gray-600">Những người đã thay đổi cuộc sống</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Anh Tuấn, 35 tuổi",
                story:
                  "Sau 15 năm hút thuốc, tôi đã cai thành công trong 3 tháng nhờ ứng dụng này.",
                rating: 5,
              },
              {
                name: "Chị Hoa, 28 tuổi",
                story:
                  "Coach rất tận tâm, A.I. tư vấn chính xác. Tôi cảm thấy khỏe hơn rất nhiều.",
                rating: 5,
              },
              {
                name: "Anh Minh, 42 tuổi",
                story:
                  "Cộng đồng rất hỗ trợ. Tôi không cảm thấy cô đơn trong hành trình cai thuốc.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.story}"</p>
                  <p className="font-medium text-gray-900">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tính năng ứng dụng
            </h2>
            <p className="text-gray-600">
              Hệ thống hỗ trợ toàn diện cho hành trình cai thuốc
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Theo dõi tiến trình
                </h3>
                <p className="text-gray-600 text-sm">
                  Ghi nhận và theo dõi hành trình cai thuốc chi tiết
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">A.I. Tư vấn</h3>
                <p className="text-gray-600 text-sm">
                  Trí tuệ nhân tạo hỗ trợ 24/7
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Cộng đồng</h3>
                <p className="text-gray-600 text-sm">
                  Kết nối với những người cùng hành trình
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bắt đầu hành trình cai thuốc lá ngay hôm nay
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hàng ngàn người đã thành công. Bạn cũng có thể làm được!
          </p>
          {/* CTA section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="text-black border-white hover:bg-white hover:text-green-600"
              onClick={onRegister}
            >
              Đăng ký miễn phí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-black border-white hover:bg-white hover:text-green-600"
              onClick={onAssessment}
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-green-500" />
                <span className="font-bold">Cai Thuốc Lá</span>
              </div>
              <p className="text-gray-400">
                Ứng dụng hỗ trợ cai thuốc lá toàn diện với công nghệ hiện đại.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Sản phẩm</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Theo dõi tiến trình</li>
                <li>A.I. tư vấn</li>
                <li>Coach chuyên nghiệp</li>
                <li>Cộng đồng hỗ trợ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Trung tâm trợ giúp</li>
                <li>Liên hệ</li>
                <li>FAQ</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@caithuocla.vn</li>
                <li>Hotline: 1900-xxxx</li>
                <li>Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Cai Thuốc Lá. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
