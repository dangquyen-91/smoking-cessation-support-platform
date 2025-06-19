"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Play, Download, Clock, ArrowLeft, BookOpen } from "lucide-react"

interface GuidesProps {
  onBack: () => void
  onRegister: () => void
}

export function Guides({ onBack, onRegister }: GuidesProps) {
  const guides = [
    {
      id: 1,
      title: "Hướng dẫn cai thuốc lá từng bước",
      description: "Hướng dẫn chi tiết từ A-Z về quá trình cai thuốc lá, từ chuẩn bị tinh thần đến duy trì thành quả",
      type: "PDF",
      duration: "30 phút đọc",
      category: "Cơ bản",
      difficulty: "Dễ",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      featured: true,
    },
    {
      id: 2,
      title: "Video: Kỹ thuật thở sâu khi thèm thuốc",
      description: "Học cách sử dụng kỹ thuật thở sâu để vượt qua cơn thèm thuốc lá một cách hiệu quả",
      type: "Video",
      duration: "15 phút",
      category: "Kỹ thuật",
      difficulty: "Dễ",
      icon: Play,
      color: "text-red-600",
      bgColor: "bg-red-50",
      featured: false,
    },
    {
      id: 3,
      title: "Kế hoạch cai thuốc 30 ngày",
      description: "Kế hoạch chi tiết theo từng ngày giúp bạn cai thuốc thành công trong 30 ngày",
      type: "PDF",
      duration: "45 phút đọc",
      category: "Kế hoạch",
      difficulty: "Trung bình",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      featured: true,
    },
    {
      id: 4,
      title: "Video: Dinh dưỡng khi cai thuốc",
      description: "Chế độ ăn uống phù hợp để hỗ trợ quá trình cai thuốc và tránh tăng cân",
      type: "Video",
      duration: "20 phút",
      category: "Dinh dưỡng",
      difficulty: "Dễ",
      icon: Play,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      featured: false,
    },
    {
      id: 5,
      title: "Xử lý tình huống khó khăn",
      description: "Cách đối phó với các tình huống dễ gây tái nghiện như stress, tiệc tùng, áp lực công việc",
      type: "PDF",
      duration: "25 phút đọc",
      category: "Nâng cao",
      difficulty: "Khó",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      featured: false,
    },
    {
      id: 6,
      title: "Video: Tập thể dục hỗ trợ cai thuốc",
      description: "Các bài tập thể dục đơn giản giúp giảm stress và cơn thèm thuốc lá",
      type: "Video",
      duration: "25 phút",
      category: "Thể dục",
      difficulty: "Dễ",
      icon: Play,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      featured: false,
    },
  ]

  const categories = [
    { name: "Tất cả", count: 24 },
    { name: "Cơ bản", count: 8 },
    { name: "Kỹ thuật", count: 6 },
    { name: "Kế hoạch", count: 4 },
    { name: "Dinh dưỡng", count: 3 },
    { name: "Nâng cao", count: 3 },
  ]

  const quickTips = [
    "Uống nhiều nước để thải độc tố",
    "Tránh cà phê và rượu trong tuần đầu",
    "Tập thể dục nhẹ mỗi ngày",
    "Ăn nhiều trái cây và rau xanh",
    "Ngủ đủ giấc để phục hồi cơ thể",
    "Tìm hoạt động thay thế khi thèm thuốc",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại trang chủ
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline">Đăng nhập để lưu tiến trình</Button>
              <Button onClick={onRegister} className="bg-green-600 hover:bg-green-700">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tài liệu hướng dẫn</h1>
          <p className="text-gray-600 mb-6">Kiến thức và hướng dẫn chi tiết về cai thuốc lá</p>

          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Lưu ý</span>
            </div>
            <p className="text-yellow-700 text-sm">
              Bạn có thể xem tất cả tài liệu miễn phí. Đăng ký tài khoản để lưu tiến trình học và nhận gợi ý cá nhân
              hóa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                      {category.name} ({category.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Guides */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tài liệu nổi bật</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guides
                  .filter((guide) => guide.featured)
                  .map((guide) => (
                    <Card key={guide.id} className="hover:shadow-lg transition-shadow border-2 border-green-200">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 ${guide.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                          <guide.icon className={`h-6 w-6 ${guide.color}`} />
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{guide.type}</Badge>
                          <Badge variant="secondary">{guide.category}</Badge>
                          <Badge
                            variant="outline"
                            className={
                              guide.difficulty === "Dễ"
                                ? "text-green-600 border-green-600"
                                : guide.difficulty === "Trung bình"
                                  ? "text-yellow-600 border-yellow-600"
                                  : "text-red-600 border-red-600"
                            }
                          >
                            {guide.difficulty}
                          </Badge>
                        </div>

                        <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{guide.description}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {guide.duration}
                          </span>
                          <Button>
                            {guide.type === "Video" ? (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Xem video
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Tải về
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* All Guides */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tất cả tài liệu</h2>
              <div className="space-y-4">
                {guides
                  .filter((guide) => !guide.featured)
                  .map((guide) => (
                    <Card key={guide.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 ${guide.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            <guide.icon className={`h-6 w-6 ${guide.color}`} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{guide.type}</Badge>
                              <Badge variant="secondary">{guide.category}</Badge>
                              <Badge
                                variant="outline"
                                className={
                                  guide.difficulty === "Dễ"
                                    ? "text-green-600 border-green-600"
                                    : guide.difficulty === "Trung bình"
                                      ? "text-yellow-600 border-yellow-600"
                                      : "text-red-600 border-red-600"
                                }
                              >
                                {guide.difficulty}
                              </Badge>
                            </div>

                            <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{guide.description}</p>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {guide.duration}
                              </span>
                              <Button variant="outline">
                                {guide.type === "Video" ? (
                                  <>
                                    <Play className="h-4 w-4 mr-2" />
                                    Xem
                                  </>
                                ) : (
                                  <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Tải
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Register CTA */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <BookOpen className="h-5 w-5" />
                  Nâng cao trải nghiệm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm mb-4">
                  Đăng ký để lưu tiến trình học, nhận gợi ý cá nhân và truy cập nội dung độc quyền
                </p>
                <Button onClick={onRegister} className="w-full bg-green-600 hover:bg-green-700">
                  Đăng ký miễn phí
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Mẹo nhanh</CardTitle>
                <CardDescription>Những điều cần nhớ khi cai thuốc</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Path */}
            <Card>
              <CardHeader>
                <CardTitle>Lộ trình học tập</CardTitle>
                <CardDescription>Thứ tự học tập được khuyến nghị</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800 text-sm">Bước 1</div>
                    <div className="text-blue-700 text-sm">Hướng dẫn cai thuốc từng bước</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800 text-sm">Bước 2</div>
                    <div className="text-green-700 text-sm">Kế hoạch cai thuốc 30 ngày</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-medium text-orange-800 text-sm">Bước 3</div>
                    <div className="text-orange-700 text-sm">Kỹ thuật thở sâu</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-800 text-sm">Bước 4</div>
                    <div className="text-purple-700 text-sm">Xử lý tình huống khó khăn</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tài liệu:</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Video hướng dẫn:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tài liệu PDF:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lượt tải:</span>
                  <span className="font-medium">15,234</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
