"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, ArrowLeft, Eye, User } from "lucide-react"

interface GuestBlogProps {
  onBack: () => void
  onRegister: () => void
}

export function GuestBlog({ onBack, onRegister }: GuestBlogProps) {
  const blogPosts = [
    {
      id: 1,
      title: "10 Mẹo Vượt Qua Cơn Thèm Thuốc Lá Hiệu Quả Nhất",
      excerpt:
        "Những phương pháp đơn giản nhưng hiệu quả để kiểm soát cơn thèm thuốc lá trong những ngày đầu cai thuốc. Từ kỹ thuật thở sâu đến việc thay đổi thói quen hàng ngày...",
      author: "Dr. Nguyễn Minh",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Mẹo hay",
      readTime: "5 phút",
      publishedAt: "2 ngày trước",
      views: 1234,
      image: "/placeholder.svg?height=200&width=400&text=Mẹo+cai+thuốc",
      featured: true,
    },
    {
      id: 2,
      title: "Hành Trình Cai Thuốc: Từ 2 Gói/Ngày Đến Hoàn Toàn Sạch",
      excerpt:
        "Chia sẻ câu chuyện cá nhân về hành trình cai thuốc lá sau 15 năm hút thuốc. Những khó khăn, thử thách và bài học quý báu mà tôi đã trải qua...",
      author: "Anh Tuấn",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Câu chuyện",
      readTime: "8 phút",
      publishedAt: "3 ngày trước",
      views: 2156,
      image: "/placeholder.svg?height=200&width=400&text=Câu+chuyện+thành+công",
      featured: false,
    },
    {
      id: 3,
      title: "Tác Động Của Thuốc Lá Đến Sức Khỏe Tim Mạch",
      excerpt:
        "Nghiên cứu mới nhất về tác động của thuốc lá đến hệ tim mạch và những cải thiện đáng kể khi ngừng hút thuốc. Hiểu rõ để có động lực mạnh mẽ hơn...",
      author: "Dr. Lê Thị Hoa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Y học",
      readTime: "6 phút",
      publishedAt: "5 ngày trước",
      views: 987,
      image: "/placeholder.svg?height=200&width=400&text=Sức+khỏe+tim+mạch",
      featured: false,
    },
    {
      id: 4,
      title: "5 Thực Phẩm Giúp Giảm Cơn Thèm Nicotine",
      excerpt:
        "Những thực phẩm tự nhiên có thể hỗ trợ giảm cơn thèm thuốc lá và cung cấp dinh dưỡng cần thiết cho cơ thể trong quá trình cai thuốc...",
      author: "Chuyên gia Dinh dưỡng",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Dinh dưỡng",
      readTime: "4 phút",
      publishedAt: "1 tuần trước",
      views: 756,
      image: "/placeholder.svg?height=200&width=400&text=Thực+phẩm+hỗ+trợ",
      featured: false,
    },
    {
      id: 5,
      title: "Cách Xử Lý Stress Khi Cai Thuốc Lá",
      excerpt:
        "Stress là một trong những nguyên nhân chính khiến người cai thuốc thất bại. Học cách quản lý stress hiệu quả để thành công trong hành trình cai thuốc...",
      author: "Tâm lý học Minh An",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Tâm lý",
      readTime: "7 phút",
      publishedAt: "1 tuần trước",
      views: 1123,
      image: "/placeholder.svg?height=200&width=400&text=Quản+lý+stress",
      featured: false,
    },
  ]

  const categories = [
    { name: "Tất cả", count: 156 },
    { name: "Mẹo hay", count: 45 },
    { name: "Câu chuyện", count: 67 },
    { name: "Y học", count: 23 },
    { name: "Dinh dưỡng", count: 21 },
    { name: "Tâm lý", count: 18 },
  ]

  const popularPosts = [
    { title: "10 mẹo vượt qua cơn thèm thuốc lá", views: 1234 },
    { title: "Cách xử lý stress khi cai thuốc", views: 1123 },
    { title: "Hành trình cai thuốc thành công", views: 2156 },
    { title: "Thực phẩm giúp giảm cơn thèm", views: 756 },
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
              <Button variant="outline">Đăng nhập để bình luận</Button>
              <Button onClick={onRegister} className="bg-green-600 hover:bg-green-700">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600 mb-6">Kiến thức và kinh nghiệm về cai thuốc lá</p>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">Dành cho khách</span>
            </div>
            <p className="text-blue-700 text-sm">
              Bạn đang xem ở chế độ khách. Đăng ký tài khoản để bình luận, like và theo dõi tác giả.
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

            {/* Featured Post */}
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <Card key={post.id} className="overflow-hidden border-2 border-green-200">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-6">
                      <Badge className="mb-2 bg-green-600">Nổi bật</Badge>
                      <Badge variant="secondary" className="mb-3 ml-2">
                        {post.category}
                      </Badge>

                      <h2 className="text-2xl font-bold mb-3 text-gray-900">{post.title}</h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <span>{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </span>
                        <span>{post.publishedAt}</span>
                      </div>

                      <Button className="w-full">Đọc bài viết</Button>
                    </div>
                  </div>
                </Card>
              ))}

            {/* Regular Posts */}
            <div className="space-y-6">
              {blogPosts
                .filter((post) => !post.featured)
                .map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">{post.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{post.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{post.author}</div>
                              <div className="text-xs text-gray-500">{post.publishedAt}</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Đọc tiếp
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">Xem thêm bài viết</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Register CTA */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <BookOpen className="h-5 w-5" />
                  Tham gia cộng đồng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm mb-4">
                  Đăng ký để bình luận, like và theo dõi các tác giả yêu thích
                </p>
                <Button onClick={onRegister} className="w-full bg-green-600 hover:bg-green-700">
                  Đăng ký miễn phí
                </Button>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Bài viết phổ biến</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularPosts.map((post, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views} lượt xem
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Authors */}
            <Card>
              <CardHeader>
                <CardTitle>Tác giả nổi bật</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>DM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">Dr. Nguyễn Minh</div>
                      <div className="text-sm text-gray-600">Bác sĩ chuyên khoa</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>LH</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">Dr. Lê Thị Hoa</div>
                      <div className="text-sm text-gray-600">Chuyên gia tim mạch</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">Đăng ký để theo dõi và nhận thông báo bài viết mới</p>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Nhận tin tức mới</CardTitle>
                <CardDescription>Cập nhật kiến thức cai thuốc lá</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Đăng ký để nhận bài viết mới và mẹo hữu ích qua email</p>
                <Button onClick={onRegister} className="w-full" variant="outline">
                  Đăng ký nhận tin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
