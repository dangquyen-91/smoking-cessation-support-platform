"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Pin, Clock, Eye, ArrowLeft, User, Users } from "lucide-react"

interface GuestForumProps {
  onBack: () => void
  onRegister: () => void
}

export function GuestForum({ onBack, onRegister }: GuestForumProps) {
  const forumTopics = [
    {
      id: 1,
      title: "Làm sao để vượt qua tuần đầu tiên cai thuốc?",
      author: "Minh Anh",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      category: "Hỏi đáp",
      replies: 23,
      views: 156,
      lastReply: "2 giờ trước",
      isPinned: true,
      isHot: true,
      excerpt:
        "Mình đang cai thuốc được 3 ngày, cảm thấy rất khó chịu và thèm thuốc liên tục. Các bạn có kinh nghiệm gì chia sẻ không?",
    },
    {
      id: 2,
      title: "Chia sẻ: 6 tháng không hút thuốc, cảm giác tuyệt vời!",
      author: "Thanh Hoa",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      category: "Chia sẻ",
      replies: 45,
      views: 289,
      lastReply: "4 giờ trước",
      isPinned: false,
      isHot: true,
      excerpt: "Hôm nay tròn 6 tháng mình cai thuốc thành công. Muốn chia sẻ hành trình và những thay đổi tích cực...",
    },
    {
      id: 3,
      title: "Có ai thử phương pháp thay thế nicotine chưa?",
      author: "Văn Đức",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      category: "Thảo luận",
      replies: 12,
      views: 78,
      lastReply: "6 giờ trước",
      isPinned: false,
      isHot: false,
      excerpt: "Mình đang tìm hiểu về kẹo cao su nicotine và miếng dán. Ai đã dùng thì chia sẻ kinh nghiệm nhé!",
    },
    {
      id: 4,
      title: "Tập thể dục có giúp giảm cơn thèm thuốc không?",
      author: "Thu Hương",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      category: "Hỏi đáp",
      replies: 18,
      views: 134,
      lastReply: "8 giờ trước",
      isPinned: false,
      isHot: false,
      excerpt: "Mình nghe nói tập thể dục giúp giảm stress và cơn thèm thuốc. Có ai thử chưa, hiệu quả thế nào?",
    },
    {
      id: 5,
      title: "Nhóm hỗ trợ cai thuốc tại Hà Nội",
      author: "Quang Minh",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      category: "Gặp gỡ",
      replies: 7,
      views: 45,
      lastReply: "1 ngày trước",
      isPinned: false,
      isHot: false,
      excerpt: "Mình muốn tạo nhóm gặp mặt trực tiếp để cùng nhau hỗ trợ cai thuốc. Ai ở Hà Nội quan tâm không?",
    },
  ]

  const categories = [
    { name: "Tất cả", count: 234, color: "bg-blue-100 text-blue-800" },
    { name: "Hỏi đáp", count: 89, color: "bg-green-100 text-green-800" },
    { name: "Chia sẻ", count: 67, color: "bg-purple-100 text-purple-800" },
    { name: "Thảo luận", count: 45, color: "bg-orange-100 text-orange-800" },
    { name: "Gặp gỡ", count: 23, color: "bg-pink-100 text-pink-800" },
    { name: "Hỗ trợ", count: 10, color: "bg-red-100 text-red-800" },
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
              <Button variant="outline">Đăng nhập để tham gia</Button>
              <Button onClick={onRegister} className="bg-green-600 hover:bg-green-700">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forum</h1>
          <p className="text-gray-600 mb-6">Cộng đồng hỗ trợ cai thuốc lá</p>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">Chế độ chỉ đọc</span>
            </div>
            <p className="text-blue-700 text-sm">
              Bạn đang xem ở chế độ khách. Đăng ký tài khoản để tạo chủ đề, bình luận và tương tác với cộng đồng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Forum Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Badge key={index} className={`cursor-pointer ${category.color}`} variant="secondary">
                      {category.name} ({category.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forum Topics */}
            <div className="space-y-2">
              {forumTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{topic.author[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {topic.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                          {topic.isHot && (
                            <Badge variant="destructive" className="text-xs">
                              Hot
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs">
                            {topic.category}
                          </Badge>
                        </div>

                        <h3 className="font-medium text-gray-900 hover:text-blue-600 mb-2">{topic.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{topic.excerpt}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>bởi {topic.author}</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {topic.replies} trả lời
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {topic.views} lượt xem
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {topic.lastReply}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <Button variant="outline">Xem thêm chủ đề</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Join CTA */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Users className="h-5 w-5" />
                  Tham gia thảo luận
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm mb-4">Đăng ký để tạo chủ đề, trả lời và kết nối với cộng đồng</p>
                <Button onClick={onRegister} className="w-full bg-green-600 hover:bg-green-700">
                  Đăng ký miễn phí
                </Button>
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Thống kê Forum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng chủ đề:</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng bài viết:</span>
                  <span className="font-medium">1,567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thành viên:</span>
                  <span className="font-medium">892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đang online:</span>
                  <span className="font-medium text-green-600">24</span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Chủ đề hot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {forumTopics
                    .filter((topic) => topic.isHot)
                    .slice(0, 3)
                    .map((topic) => (
                      <div key={topic.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{topic.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{topic.replies} trả lời</span>
                          <span>•</span>
                          <span>{topic.views} lượt xem</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Forum Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Quy tắc Forum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Tôn trọng và hỗ trợ lẫn nhau</p>
                  <p>• Không spam hoặc quảng cáo</p>
                  <p>• Chia sẻ kinh nghiệm tích cực</p>
                  <p>• Bảo vệ thông tin cá nhân</p>
                  <p>• Báo cáo nội dung không phù hợp</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Minh Anh</div>
                    <div className="text-gray-600">đã trả lời trong "Vượt qua tuần đầu"</div>
                    <div className="text-xs text-gray-500">2 giờ trước</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Thanh Hoa</div>
                    <div className="text-gray-600">đã tạo chủ đề mới</div>
                    <div className="text-xs text-gray-500">4 giờ trước</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Văn Đức</div>
                    <div className="text-gray-600">đã like bài viết</div>
                    <div className="text-xs text-gray-500">6 giờ trước</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
