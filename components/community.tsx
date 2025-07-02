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
import {
  Users,
  Trophy,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { motion } from "framer-motion";

export function Community() {
  const achievements = [
    {
      user: "Minh Anh",
      avatar: "/placeholder.svg?height=40&width=40",
      achievement: "30 ngày không hút thuốc",
      badge: "🏆",
      likes: 24,
      comments: 8,
      timeAgo: "2 giờ trước",
    },
    {
      user: "Thanh Hoa",
      avatar: "/placeholder.svg?height=40&width=40",
      achievement: "Tiết kiệm được 2 triệu đồng",
      badge: "💰",
      likes: 18,
      comments: 5,
      timeAgo: "5 giờ trước",
    },
    {
      user: "Văn Đức",
      avatar: "/placeholder.svg?height=40&width=40",
      achievement: "6 tháng sạch thuốc lá",
      badge: "⭐",
      likes: 45,
      comments: 12,
      timeAgo: "1 ngày trước",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const topMembers = [
    { name: "Nguyễn Văn A", days: 365, badge: "🥇" },
    { name: "Trần Thị B", days: 280, badge: "🥈" },
    { name: "Lê Văn C", days: 195, badge: "🥉" },
    { name: "Phạm Thị D", days: 150, badge: "🏆" },
    { name: "Hoàng Văn E", days: 120, badge: "🎖️" },
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Cộng đồng</h1>
          <p className="text-gray-600">
            Chia sẻ thành tích và tương tác với cộng đồng
          </p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Achievements */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Thành tích mới nhất
                </CardTitle>
                <CardDescription>
                  Những thành tích được chia sẻ gần đây
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage
                          src={achievement.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{achievement.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">
                            {achievement.user}
                          </span>
                          <span className="text-2xl">{achievement.badge}</span>
                          <Badge variant="secondary">Thành tích mới</Badge>
                        </div>
                        <p className="text-gray-700 mb-3">
                          {achievement.achievement}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4" />
                            {achievement.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <MessageCircle className="h-4 w-4" />
                            {achievement.comments}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <Share2 className="h-4 w-4" />
                            Chia sẻ
                          </button>
                          <span className="ml-auto">{achievement.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Share Achievement */}
            <Card>
              <CardHeader>
                <CardTitle>Chia sẻ thành tích của bạn</CardTitle>
                <CardDescription>
                  Khuyến khích cộng đồng bằng cách chia sẻ tiến trình
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <Trophy className="h-6 w-6 text-yellow-600" />
                    <span className="text-sm">Huy hiệu mới</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <Heart className="h-6 w-6 text-red-600" />
                    <span className="text-sm">Cải thiện sức khỏe</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <Users className="h-6 w-6 text-blue-600" />
                    <span className="text-sm">Câu chuyện cá nhân</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-6 w-6 text-green-600" />
                    <span className="text-sm">Lời khuyên</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Top Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Bảng xếp hạng
                </CardTitle>
                <CardDescription>Thành viên xuất sắc nhất</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <span className="text-2xl">{member.badge}</span>
                      <div className="flex-1">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">
                          {member.days} ngày
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Thống kê cộng đồng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1,247</div>
                  <div className="text-sm text-green-700">
                    Thành viên tích cực
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">15,680</div>
                  <div className="text-sm text-blue-700">
                    Ngày không hút thuốc
                  </div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    2,340
                  </div>
                  <div className="text-sm text-yellow-700">Huy hiệu đã đạt</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Tham gia ngay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  Tham gia Forum
                </Button>
                <Button className="w-full" variant="outline">
                  Đọc Blog
                </Button>
                <Button className="w-full" variant="outline">
                  Tìm bạn đồng hành
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
