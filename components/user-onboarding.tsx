"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Target, Heart, Users, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function UserOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData")
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }
  }, [])

  const onboardingSteps = [
    {
      id: 1,
      title: "Hoàn thiện hồ sơ",
      description: "Cập nhật thông tin cá nhân để nhận gợi ý phù hợp",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      action: "Cập nhật hồ sơ",
    },
    {
      id: 2,
      title: "Đánh giá tình trạng hút thuốc",
      description: "Ghi nhận thói quen hút thuốc hiện tại",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: "Bắt đầu đánh giá",
    },
    {
      id: 3,
      title: "Tạo kế hoạch cai thuốc",
      description: "Thiết lập mục tiêu và lộ trình cá nhân",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: "Tạo kế hoạch",
    },
    {
      id: 4,
      title: "Tham gia cộng đồng",
      description: "Kết nối với những người cùng hành trình",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: "Khám phá cộng đồng",
    },
  ]

  const completeStep = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    if (stepId < onboardingSteps.length) {
      setCurrentStep(stepId + 1)
    }
  }

  const progressPercentage = (completedSteps.length / onboardingSteps.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Chào mừng đến với hành trình cai thuốc! 🎉</h1>
        <p className="text-gray-600">Hãy hoàn thành các bước sau để bắt đầu</p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tiến trình thiết lập</span>
            <Badge variant="outline">
              {completedSteps.length}/{onboardingSteps.length} hoàn thành
            </Badge>
          </CardTitle>
          <CardDescription>Hoàn thành các bước để tối ưu trải nghiệm</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="mb-4" />
          <p className="text-sm text-gray-600">
            {progressPercentage === 100
              ? "🎉 Tuyệt vời! Bạn đã sẵn sàng bắt đầu hành trình cai thuốc"
              : `Còn ${onboardingSteps.length - completedSteps.length} bước nữa để hoàn thành`}
          </p>
        </CardContent>
      </Card>

      {/* Onboarding Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {onboardingSteps.map((step) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = currentStep === step.id
          const isLocked = step.id > currentStep && !isCompleted

          return (
            <Card
              key={step.id}
              className={`relative transition-all ${
                isCompleted
                  ? "border-green-200 bg-green-50"
                  : isCurrent
                    ? "border-blue-200 bg-blue-50 ring-2 ring-blue-100"
                    : isLocked
                      ? "border-gray-200 bg-gray-50 opacity-60"
                      : "border-gray-200 hover:shadow-md"
              }`}
            >
              {isCompleted && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}

              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                      {isCurrent && <Badge variant="default">Hiện tại</Badge>}
                      {isCompleted && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Hoàn thành
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{step.description}</p>

                    <Button
                      onClick={() => completeStep(step.id)}
                      disabled={isLocked}
                      variant={isCompleted ? "outline" : "default"}
                      className="w-full"
                    >
                      {isCompleted ? "Xem lại" : step.action}
                      {!isCompleted && <ArrowRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Welcome Message with Tool Results */}
      {userData?.toolResults && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-blue-800 mb-3">📊 Kết quả đánh giá ban đầu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.toolResults.type === "addiction-assessment" && (
                <>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-600">Mức độ nghiện nicotine</div>
                    <div className="font-bold text-lg">{userData.toolResults.addictionLevel}</div>
                    <div className="text-sm text-blue-600">Điểm: {userData.toolResults.fagerstromScore}/10</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-600">Thói quen hiện tại</div>
                    <div className="font-bold text-lg">{userData.toolResults.cigarettesPerDay} điếu/ngày</div>
                    <div className="text-sm text-blue-600">{userData.toolResults.smokingYears} năm hút thuốc</div>
                  </div>
                </>
              )}
              {userData.toolResults.type === "cost-calculator" && (
                <>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-600">Chi phí hàng năm</div>
                    <div className="font-bold text-lg text-red-600">
                      {userData.toolResults.yearlyCost?.toLocaleString()}đ
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-600">Tiết kiệm tiềm năng</div>
                    <div className="font-bold text-lg text-green-600">Bắt đầu ngay!</div>
                  </div>
                </>
              )}
            </div>
            <p className="text-blue-700 text-sm mt-3">
              Chúng tôi sẽ sử dụng thông tin này để tạo kế hoạch cá nhân hóa cho bạn.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Completion Message */}
      {progressPercentage === 100 && (
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">🎉 Chúc mừng!</h3>
            <p className="mb-4">Bạn đã hoàn thành thiết lập. Hành trình cai thuốc của bạn bắt đầu từ đây!</p>
            <Button variant="secondary">
              Đi đến Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
