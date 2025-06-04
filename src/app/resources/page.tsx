import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Video, Clock } from "lucide-react"

export default function ResourcesPage() {
  const articles = [
    {
      title: "10 Bước Cai Thuốc Lá Hiệu Quả",
      description: "Hướng dẫn chi tiết từng bước để cai thuốc lá thành công",
      type: "article",
      duration: "15 phút đọc",
      category: "Hướng dẫn cơ bản",
    },
    {
      title: "Quản Lý Cơn Thèm Thuốc",
      description: "Các kỹ thuật và phương pháp để vượt qua cơn thèm thuốc",
      type: "article",
      duration: "10 phút đọc",
      category: "Kỹ thuật",
    },
    {
      title: "Tác Động Tích Cực Khi Cai Thuốc",
      description: "Những thay đổi tích cực trong cơ thể sau khi ngừng hút thuốc",
      type: "article",
      duration: "8 phút đọc",
      category: "Động lực",
    },
  ]

  const videos = [
    {
      title: "Hướng Dẫn Thở Sâu Để Giảm Căng Thẳng",
      description: "Video hướng dẫn kỹ thuật thở sâu thay thế việc hút thuốc",
      type: "video",
      duration: "12 phút",
      category: "Thực hành",
    },
    {
      title: "Chia Sẻ Từ Người Đã Cai Thuốc Thành Công",
      description: "Câu chuyện truyền cảm hứng từ những người đã cai thuốc",
      type: "video",
      duration: "25 phút",
      category: "Động lực",
    },
    {
      title: "Yoga Cho Người Cai Thuốc",
      description: "Bài tập yoga giúp thư giãn và giảm stress khi cai thuốc",
      type: "video",
      duration: "30 phút",
      category: "Thực hành",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Tài Liệu Hướng Dẫn</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập tài liệu, bài viết và video hướng dẫn để hỗ trợ hành trình cai thuốc lá của bạn. Tất
              cả nội dung đều miễn phí.
            </p>
          </div>

          {/* Articles Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Bài Viết Hướng Dẫn
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.duration}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Đọc Bài Viết</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Videos Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Video className="h-6 w-6" />
              Video Hướng Dẫn
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{video.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Video className="h-4 w-4 mr-1" />
                        {video.duration}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    <Button className="w-full">Xem Video</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Lưu Ý Quan Trọng</h3>
            <p className="text-blue-700">
              Tất cả tài liệu và hướng dẫn chỉ mang tính chất tham khảo. Để có kết quả tốt nhất, bạn nên kết hợp với sự
              hỗ trợ từ bác sĩ hoặc chuyên gia tâm lý. Tiến trình học tập không được lưu trữ.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
