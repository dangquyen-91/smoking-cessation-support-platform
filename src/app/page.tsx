import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, FileText, Users, TrendingDown, Shield, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Cai Thuốc Lá
            <span className="text-green-600"> Thành Công</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Hành trình cai thuốc lá của bạn bắt đầu từ đây. Chúng tôi cung cấp các công cụ, hướng dẫn và hỗ trợ cần
            thiết để giúp bạn từ bỏ thói quen hút thuốc một cách hiệu quả.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/assessment">Đánh Giá Mức Độ Nghiện</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Đăng Ký Tài Khoản</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tobacco Harm Information */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tác Hại Của Thuốc Lá</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle className="text-red-700">Sức Khỏe Tim Mạch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Thuốc lá làm tăng nguy cơ bệnh tim, đột quỵ và các vấn đề về huyết áp. Nicotine làm co mạch máu và
                  tăng nhịp tim.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <Shield className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-orange-700">Hệ Hô Hấp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Gây tổn thương phổi, viêm phế quản mãn tính, khó thở và tăng nguy cơ ung thư phổi đáng kể.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <TrendingDown className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle className="text-purple-700">Tài Chính</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Chi phí mua thuốc lá hàng năm có thể lên đến hàng chục triệu đồng, chưa kể chi phí điều trị bệnh tật.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Tools */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Công Cụ Hỗ Trợ Cai Thuốc</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Calculator className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle>Đánh Giá Nghiện</CardTitle>
                  <CardDescription>Kiểm tra mức độ nghiện thuốc lá của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/assessment">Bắt Đầu Đánh Giá</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <TrendingDown className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle>Tính Chi Phí</CardTitle>
                  <CardDescription>Tính toán chi phí tiêu thụ thuốc lá</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/cost-calculator">Tính Chi Phí</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <FileText className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <CardTitle>Tài Liệu</CardTitle>
                  <CardDescription>Hướng dẫn và bài viết cai thuốc</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/resources">Xem Tài Liệu</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Cộng Đồng</CardTitle>
                  <CardDescription>Blog và forum hỗ trợ cộng đồng</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/community">Tham Gia</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Sẵn Sàng Bắt Đầu Hành Trình Cai Thuốc?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Hãy đăng ký tài khoản để truy cập đầy đủ các tính năng và nhận được hỗ trợ cá nhân hóa.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/register">Đăng Ký Ngay</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
