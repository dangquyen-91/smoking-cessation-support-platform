import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BookOpen, Heart, MessageCircle, Share2, Clock } from "lucide-react";

export function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Mẹo Vượt Qua Cơn Thèm Thuốc Lá",
      excerpt:
        "Những phương pháp đơn giản nhưng hiệu quả để kiểm soát cơn thèm thuốc lá trong những ngày đầu cai thuốc...",
      author: "Dr. Nguyễn Minh",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Mẹo hay",
      readTime: "5 phút",
      publishedAt: "2 ngày trước",
      likes: 45,
      comments: 12,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Hành Trình Cai Thuốc Của Tôi: Từ 2 Gói/Ngày Đến Hoàn Toàn Sạch",
      excerpt:
        "Chia sẻ câu chuyện cá nhân về hành trình cai thuốc lá sau 15 năm hút thuốc. Những khó khăn, thử thách và bài học...",
      author: "Anh Tuấn",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Câu chuyện",
      readTime: "8 phút",
      publishedAt: "3 ngày trước",
      likes: 78,
      comments: 23,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Tác Động Của Thuốc Lá Đến Sức Khỏe Tim Mạch",
      excerpt:
        "Nghiên cứu mới nhất về tác động của thuốc lá đến hệ tim mạch và những cải thiện đáng kể khi ngừng hút thuốc...",
      author: "Dr. Lê Thị Hoa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Y học",
      readTime: "6 phút",
      publishedAt: "5 ngày trước",
      likes: 34,
      comments: 8,
      image: "/placeholder.svg?height=200&width=400",
    },
  ];

  const categories = [
    { name: "Tất cả", count: 156, active: true },
    { name: "Mẹo hay", count: 45 },
    { name: "Câu chuyện", count: 67 },
    { name: "Y học", count: 23 },
    { name: "Dinh dưỡng", count: 21 },
  ];

  const popularPosts = [
    { title: "5 Thực phẩm giúp giảm cơn thèm nicotine", views: 1234 },
    { title: "Cách xử lý stress khi cai thuốc", views: 987 },
    { title: "Lợi ích của việc tập thể dục khi cai thuốc", views: 856 },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <motion.section
        className="py-0 px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600">Đọc, chia sẻ và học hỏi từ cộng đồng</p>
        </div>
      </motion.section>

      <motion.section
        className="py-0 px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Badge
                      key={index}
                      variant={category.active ? "default" : "secondary"}
                      className="cursor-pointer"
                    >
                      {category.name} ({category.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blog Posts */}
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
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
                      </div>

                      <h3 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={post.authorAvatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">
                              {post.author}
                            </div>
                            <div className="text-xs text-gray-500">
                              {post.publishedAt}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <button className="flex items-center gap-1 hover:text-red-600">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-1 hover:text-green-600">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
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
            {/* Write Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Viết bài
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Chia sẻ câu chuyện</Button>
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
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                      <p className="text-xs text-gray-600">
                        {post.views} lượt xem
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Authors to Follow */}
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
                      <div className="text-sm text-gray-600">
                        Bác sĩ chuyên khoa
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Theo dõi
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>LH</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">Dr. Lê Thị Hoa</div>
                      <div className="text-sm text-gray-600">
                        Chuyên gia tim mạch
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Theo dõi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Đăng ký nhận tin</CardTitle>
                <CardDescription>
                  Nhận bài viết mới nhất qua email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Đăng ký</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
