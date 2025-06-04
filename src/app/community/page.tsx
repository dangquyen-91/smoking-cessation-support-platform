import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Heart, Eye, Calendar } from "lucide-react"

export default function CommunityPage() {
  const blogPosts = [
    {
      title: "Hành Trình 100 Ngày Cai Thuốc Của Tôi",
      excerpt: "Chia sẻ những khó khăn và thành công trong 100 ngày đầu cai thuốc lá...",
      author: "Minh Hoàng",
      date: "2 ngày trước",
      views: 1250,
      likes: 89,
      comments: 23,
      category: "Chia sẻ kinh nghiệm",
    },
    {
      title: "5 Thói Quen Thay Thế Hiệu Quả",
      excerpt: "Những thói quen tích cực giúp bạn quên đi việc hút thuốc...",
      author: "Dr. Lan Anh",
      date: "1 tuần trước",
      views: 2100,
      likes: 156,
      comments: 45,
      category: "Lời khuyên chuyên gia",
    },
    {
      title: "Tại Sao Tôi Thất Bại Và Học Được Gì",
      excerpt: "Những bài học quý giá từ những lần cai thuốc không thành công...",
      author: "Thanh Tùng",
      date: "3 ngày trước",
      views: 890,
      likes: 67,
      comments: 18,
      category: "Bài học kinh nghiệm",
    },
  ]

  const forumTopics = [
    {
      title: "Làm sao để vượt qua tuần đầu tiên?",
      author: "Ngọc Mai",
      replies: 34,
      lastReply: "2 giờ trước",
      category: "Hỏi đáp",
      isHot: true,
    },
    {
      title: "Chia sẻ app theo dõi tiến trình cai thuốc",
      author: "Văn Đức",
      replies: 28,
      lastReply: "5 giờ trước",
      category: "Công cụ hỗ trợ",
      isHot: false,
    },
    {
      title: "Cách đối phó với áp lực từ bạn bè",
      author: "Thu Hà",
      replies: 19,
      lastReply: "1 ngày trước",
      category: "Tâm lý",
      isHot: false,
    },
    {
      title: "Thay đổi tích cực sau 6 tháng cai thuốc",
      author: "Quang Minh",
      replies: 42,
      lastReply: "3 giờ trước",
      category: "Chia sẻ thành công",
      isHot: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Cộng Đồng Cai Thuốc</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kết nối với cộng đồng những người cùng hành trình cai thuốc. Đọc những chia sẻ, kinh nghiệm và lời khuyên
              từ mọi người.
            </p>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Lưu ý:</strong> Hiện tại bạn chỉ có thể đọc nội dung. Để tương tác (bình luận, like, chia sẻ),
                vui lòng đăng ký tài khoản.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Blog Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Blog Chia Sẻ</h2>
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl hover:text-blue-600 cursor-pointer">{post.title}</CardTitle>
                      <CardDescription className="text-base">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Forum Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Forum Thảo Luận</h2>
              <div className="space-y-4">
                {forumTopics.map((topic, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={topic.isHot ? "destructive" : "outline"}>
                          {topic.isHot ? "Hot" : topic.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-base hover:text-blue-600 cursor-pointer">{topic.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {topic.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{topic.author}</span>
                        </div>
                        <div className="text-right">
                          <div>{topic.replies} phản hồi</div>
                          <div className="text-xs">{topic.lastReply}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Community Stats */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-lg">Thống Kê Cộng Đồng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Thành viên:</span>
                    <span className="font-semibold">12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bài viết:</span>
                    <span className="font-semibold">3,280</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thảo luận:</span>
                    <span className="font-semibold">8,920</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thành công cai thuốc:</span>
                    <span className="font-semibold text-green-600">2,150</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
