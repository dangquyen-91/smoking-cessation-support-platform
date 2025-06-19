"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  TrendingUp,
  Target,
  Heart,
  DollarSign,
  Clock,
  Award,
  Users,
  MessageSquare,
  BookOpen,
} from "lucide-react"
import { useState, useEffect } from "react"

export function Dashboard() {
  const [userData, setUserData] = useState<any>(null)
  const [stats, setStats] = useState({
    smokeFreedays: 15,
    moneySaved: 450000,
    cigarettesAvoided: 300,
    healthImprovement: 75,
  })

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData")
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }
  }, [])

  const achievements = [
    { title: "Tuần đầu tiên", description: "7 ngày không hút thuốc", completed: true },
    { title: "Hai tuần mạnh mẽ", description: "14 ngày không hút thuốc", completed: true },
    { title: "Một tháng chiến thắng", description: "30 ngày không hút thuốc", completed: false },
  ]

  const quickActions = [
    { title: "Cập nhật tình trạng", icon: Heart, action: "smoking-status", color: "bg-red-500" },
    { title: "Xem kế hoạch", icon: Target, action: "quit-plan", color: "bg-blue-500" },
    { title: "Theo dõi tiến trình", icon: TrendingUp, action: "progress", color: "bg-green-500" },
    { title: "Tham gia cộng đồng", icon: Users, action: "community", color: "bg-purple-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại, {userData?.fullName || "Bạn"}!</h1>
        <p className="text-green-100">Hôm nay là ngày thứ {stats.smokeFreedays} bạn không hút thuốc. Tuyệt vời!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ngày không hút</p>
                <p className="text-3xl font-bold text-green-600">{stats.smokeFreedays}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiền tiết kiệm</p>
                <p className="text-3xl font-bold text-blue-600">{stats.moneySaved.toLocaleString()}đ</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Điếu thuốc tránh</p>
                <p className="text-3xl font-bold text-purple-600">{stats.cigarettesAvoided}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sức khỏe cải thiện</p>
                <p className="text-3xl font-bold text-red-600">{stats.healthImprovement}%</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tiến trình hôm nay
            </CardTitle>
            <CardDescription>Theo dõi mục tiêu hàng ngày của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Không hút thuốc</span>
                <span>24/24 giờ</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Uống nước</span>
                <span>6/8 ly</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tập thể dục</span>
                <span>20/30 phút</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Thành tích
            </CardTitle>
            <CardDescription>Những cột mốc bạn đã đạt được</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${achievement.completed ? "bg-green-500" : "bg-gray-300"}`} />
                  <div className="flex-1">
                    <p className={`font-medium ${achievement.completed ? "text-green-700" : "text-gray-500"}`}>
                      {achievement.title}
                    </p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.completed && <Badge variant="secondary">Hoàn thành</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hành động nhanh</CardTitle>
          <CardDescription>Các tính năng thường dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button key={index} variant="outline" className="h-20 flex-col gap-2">
                  <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{action.title}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Hoạt động gần đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Heart className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Cập nhật tình trạng sức khỏe</p>
                <p className="text-sm text-gray-600">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Tham gia thảo luận cộng đồng</p>
                <p className="text-sm text-gray-600">5 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Đọc bài viết về cai thuốc</p>
                <p className="text-sm text-gray-600">1 ngày trước</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
