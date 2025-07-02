"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
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
} from "lucide-react"
import type { HomePageProps } from "@/types/components"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function HomePage({
  onAssessment,
  onCostCalculator,
  onResources,
  onCommunity,
  onRegister,
  onLogin,
}: HomePageProps) {
  const harmfulEffects = [
    { title: "Ung thư phổi", description: "Nguy cơ tăng 15-30 lần", icon: "🫁" },
    { title: "Bệnh tim mạch", description: "Tăng 2-4 lần nguy cơ đột quỵ", icon: "❤️" },
    { title: "Lão hóa da", description: "Da nhăn nheo, mất độ đàn hồi", icon: "👴" },
    { title: "Giảm tuổi thọ", description: "Trung bình giảm 10-15 năm", icon: "⏰" },
  ]

  const benefits = [
    { time: "20 phút", effect: "Nhịp tim và huyết áp bình thường" },
    { time: "12 giờ", effect: "Lượng CO trong máu giảm" },
    { time: "2-3 tuần", effect: "Tuần hoàn máu cải thiện" },
    { time: "1-9 tháng", effect: "Giảm ho và khó thở" },
    { time: "1 năm", effect: "Nguy cơ bệnh tim giảm 50%" },
  ]

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
  ]

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
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Cai Thuốc Lá</h1>
                <p className="text-xs text-gray-600">Sức khỏe là vàng</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onLogin}>
                Đăng nhập
              </Button>
              <Button onClick={onRegister} className="bg-green-600 hover:bg-green-700">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hành trình cai thuốc lá
            <span className="text-green-600"> thành công</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ứng dụng hỗ trợ cai thuốc lá toàn diện với công nghệ A.I., huấn luyện viên chuyên nghiệp và cộng đồng hỗ trợ tích cực
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button size="lg" onClick={onRegister} className="bg-green-600 hover:bg-green-700">
                Bắt đầu ngay - Miễn phí
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
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
      </motion.section>

      {/* Video giới thiệu */}
      <motion.section
  className="py-16 px-4 bg-white"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <div className="max-w-7xl mx-auto text-center mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Video giới thiệu</h2>
    <p className="text-gray-600 mb-6">Khám phá cách ứng dụng có thể đồng hành cùng bạn</p>
    <div
      className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200"
      style={{ paddingTop: "42.85%" }} // 21:9 ratio
    >
      <iframe
        src="https://www.youtube.com/embed/NyzNaEPnKkk"
        title="Giới thiệu ứng dụng Cai Thuốc"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  </div>
</motion.section>



      {/* Harmful Effects */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tác hại của thuốc lá</h2>
            <p className="text-gray-600">Hiểu rõ tác hại để có động lực cai thuốc</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {harmfulEffects.map((effect, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
              >
                <Card className="text-center transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{effect.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{effect.title}</h3>
                    <p className="text-sm text-gray-600">{effect.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-16 bg-white px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu chuyện thành công</h2>
            <p className="text-gray-600">Những người đã thay đổi cuộc sống</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Anh Tuấn, 35 tuổi",
                story: "Sau 15 năm hút thuốc, tôi đã cai thành công trong 3 tháng nhờ ứng dụng này.",
                rating: 5,
              },
              {
                name: "Chị Hoa, 28 tuổi",
                story: "Coach rất tận tâm, A.I. tư vấn chính xác. Tôi cảm thấy khỏe hơn rất nhiều.",
                rating: 5,
              },
              {
                name: "Anh Minh, 42 tuổi",
                story: "Cộng đồng rất hỗ trợ. Tôi không cảm thấy cô đơn trong hành trình cai thuốc.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">"{testimonial.story}"</p>
                    <p className="font-medium text-gray-900">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* App Features */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tính năng ứng dụng</h2>
            <p className="text-gray-600">Hệ thống hỗ trợ toàn diện cho hành trình cai thuốc</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}>
              <Card className="text-center transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Theo dõi tiến trình</h3>
                  <p className="text-gray-600 text-sm">Ghi nhận và theo dõi hành trình cai thuốc chi tiết</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}>
              <Card className="text-center transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">A.I. Tư vấn</h3>
                  <p className="text-gray-600 text-sm">Trí tuệ nhân tạo hỗ trợ 24/7</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}>
              <Card className="text-center transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Cộng đồng</h3>
                  <p className="text-gray-600 text-sm">Kết nối với những người cùng hành trình</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-green-600 text-white px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bắt đầu hành trình cai thuốc lá ngay hôm nay</h2>
          <p className="text-xl mb-8 opacity-90">Hàng ngàn người đã thành công. Bạn cũng có thể làm được!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button size="lg" variant="secondary" onClick={onRegister}>
                Đăng ký miễn phí
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-12 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-green-500" />
                <span className="font-bold">Cai Thuốc Lá</span>
              </div>
              <p className="text-gray-400">Ứng dụng hỗ trợ cai thuốc lá toàn diện với công nghệ hiện đại.</p>
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
      </motion.footer>
    </div>
  )
}
