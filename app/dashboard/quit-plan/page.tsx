"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Target, Calendar, Edit, Trash2, Plus, CheckCircle, ArrowRight, ArrowLeft, TrendingDown } from "lucide-react"
import { useState } from "react"

interface Milestone {
  date: string
  goal: string
  description?: string
  completed: boolean
}

interface Plan {
  id: number
  title: string
  reason: string
  method: string
  startDate: string
  targetDate: string
  milestones: Milestone[]
  status: string
  template?: string
}

interface TimelineItem {
  week: number
  goal: string
  description: string
}

interface Template {
  id: number
  name: string
  description: string
  method: string
  duration: string
  difficulty: string
  successRate: string
  icon: string
  color: string
  timeline: TimelineItem[]
  tips: string[]
}

export default function QuitPlan() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 1,
      title: "Kế hoạch cai thuốc 3 tháng",
      reason: "Vì sức khỏe gia đình và tiết kiệm chi phí",
      method: "gradual",
      startDate: "2024-01-15",
      targetDate: "2024-04-15",
      milestones: [
        { date: "2024-01-22", goal: "Giảm xuống 5 điếu/ngày", completed: true },
        { date: "2024-02-01", goal: "Giảm xuống 2 điếu/ngày", completed: true },
        { date: "2024-02-15", goal: "Hoàn toàn không hút", completed: false },
      ],
      status: "active",
    },
  ])

  const [showNewPlanFlow, setShowNewPlanFlow] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Choose Template, 2: Customize, 3: Review
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [customPlan, setCustomPlan] = useState<Omit<Plan, "id" | "status" | "template">>({
    title: "",
    reason: "",
    method: "",
    startDate: "",
    targetDate: "",
    milestones: [],
  })

  // Predefined plan templates
  const planTemplates: Template[] = [
    {
      id: 1,
      name: "Giảm dần 4 tuần",
      description: "Phù hợp cho người hút 10-20 điếu/ngày, muốn giảm từ từ để tránh shock",
      method: "gradual",
      duration: "4 tuần",
      difficulty: "Dễ",
      successRate: "75%",
      icon: "📉",
      color: "green",
      timeline: [
        { week: 1, goal: "Giảm 50% số điếu", description: "Từ X điếu xuống X/2 điếu/ngày" },
        { week: 2, goal: "Giảm 75% số điếu", description: "Chỉ hút 1/4 số điếu ban đầu" },
        { week: 3, goal: "Chỉ hút 1-2 điếu/ngày", description: "Gần như hoàn toàn cai" },
        { week: 4, goal: "Hoàn toàn không hút", description: "Dừng hoàn toàn việc hút thuốc" },
      ],
      tips: [
        "Thay thế thuốc bằng kẹo cao su không đường",
        "Tập thể dục nhẹ khi thèm thuốc",
        "Tránh xa những nơi thường hút thuốc",
      ],
    },
    {
      id: 2,
      name: "Dừng ngay lập tức",
      description: "Cho người có ý chí mạnh mẽ, muốn dừng hoàn toàn ngay từ ngày đầu",
      method: "cold_turkey",
      duration: "2 tuần",
      difficulty: "Khó",
      successRate: "60%",
      icon: "🛑",
      color: "red",
      timeline: [
        { week: 1, goal: "Hoàn toàn không hút", description: "Dừng 100% từ ngày đầu tiên" },
        { week: 2, goal: "Vượt qua cơn thèm", description: "Kiểm soát cảm giác thèm thuốc" },
      ],
      tips: [
        "Chuẩn bị tinh thần vững vàng",
        "Loại bỏ tất cả thuốc lá khỏi nhà",
        "Tìm hoạt động thay thế ngay lập tức",
        "Có hỗ trợ từ gia đình và bạn bè",
      ],
    },
    {
      id: 3,
      name: "Thay thế Nicotine",
      description: "Sử dụng kẹo cao su, miếng dán nicotine để giảm dần cơn thèm",
      method: "nicotine_replacement",
      duration: "8 tuần",
      difficulty: "Trung bình",
      successRate: "70%",
      icon: "🔄",
      color: "blue",
      timeline: [
        { week: 1, goal: "Bắt đầu thay thế", description: "Dùng kẹo cao su/miếng dán nicotine" },
        { week: 2, goal: "Giảm thuốc lá 50%", description: "Kết hợp nicotine thay thế và giảm thuốc" },
        { week: 4, goal: "Hoàn toàn không hút", description: "Chỉ dùng sản phẩm thay thế nicotine" },
        { week: 8, goal: "Ngừng thay thế nicotine", description: "Hoàn toàn sạch nicotine" },
      ],
      tips: [
        "Tham khảo ý kiến bác sĩ về liều lượng",
        "Không hút thuốc khi đang dùng sản phẩm thay thế",
        "Giảm dần liều lượng theo kế hoạch",
      ],
    },
    {
      id: 4,
      name: "Hỗ trợ thuốc men",
      description: "Kết hợp với thuốc cai thuốc theo toa bác sĩ (Champix, Zyban...)",
      method: "medication",
      duration: "12 tuần",
      difficulty: "Trung bình",
      successRate: "80%",
      icon: "💊",
      color: "purple",
      timeline: [
        { week: 1, goal: "Bắt đầu dùng thuốc", description: "Uống thuốc theo toa, vẫn hút bình thường" },
        { week: 2, goal: "Ngày quit day", description: "Dừng hút thuốc, tiếp tục dùng thuốc" },
        { week: 8, goal: "Ổn định không hút", description: "Duy trì không hút, tiếp tục thuốc" },
        { week: 12, goal: "Hoàn thành liệu trình", description: "Ngừng thuốc, hoàn toàn cai thành công" },
      ],
      tips: ["Bắt buộc phải có toa bác sĩ", "Theo dõi tác dụng phụ", "Không bỏ thuốc đột ngột", "Tái khám định kỳ"],
    },
    {
      id: 5,
      name: "Kế hoạch tùy chỉnh",
      description: "Tạo kế hoạch riêng phù hợp với tình trạng cá nhân của bạn",
      method: "custom",
      duration: "Tùy chỉnh",
      difficulty: "Tùy chỉnh",
      successRate: "Tùy thuộc",
      icon: "⚙️",
      color: "gray",
      timeline: [],
      tips: ["Bạn sẽ tự thiết kế timeline và milestones phù hợp"],
    },
  ]

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template)
    if (template.method === "custom") {
      setCustomPlan({
        title: "",
        reason: "",
        method: "gradual",
        startDate: "",
        targetDate: "",
        milestones: [],
      })
    } else {
      // Pre-fill based on template
      const startDate = new Date()
      const targetDate = new Date()

      // Calculate target date based on template duration
      const durationWeeks = Number.parseInt(template.duration.split(" ")[0]) || 4
      targetDate.setDate(startDate.getDate() + durationWeeks * 7)

      setCustomPlan({
        title: template.name,
        reason: "",
        method: template.method,
        startDate: startDate.toISOString().split("T")[0],
        targetDate: targetDate.toISOString().split("T")[0],
        milestones: template.timeline.map((item, index) => {
          const milestoneDate = new Date(startDate)
          milestoneDate.setDate(startDate.getDate() + item.week * 7)
          return {
            date: milestoneDate.toISOString().split("T")[0],
            goal: item.goal,
            description: item.description,
            completed: false,
          }
        }),
      })
    }
    setCurrentStep(2)
  }

  const handleCreatePlan = () => {
    if (customPlan.title && customPlan.reason && customPlan.startDate && customPlan.targetDate) {
      const plan = {
        id: Date.now(),
        ...customPlan,
        status: "draft",
        template: selectedTemplate?.name,
      }
      setPlans([...plans, plan])

      // Reset form
      setShowNewPlanFlow(false)
      setCurrentStep(1)
      setSelectedTemplate(null)
      setCustomPlan({
        title: "",
        reason: "",
        method: "gradual",
        startDate: "",
        targetDate: "",
        milestones: [],
      })
    }
  }

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter((plan) => plan.id !== id))
  }

  const toggleMilestone = (planId: number, milestoneIndex: number) => {
    setPlans(
      plans.map((plan) => {
        if (plan.id === planId) {
          const updatedMilestones = [...plan.milestones]
          updatedMilestones[milestoneIndex].completed = !updatedMilestones[milestoneIndex].completed
          return { ...plan, milestones: updatedMilestones }
        }
        return plan
      }),
    )
  }

  const addMilestone = () => {
    setCustomPlan({
      ...customPlan,
      milestones: [
        ...customPlan.milestones,
        {
          date: "",
          goal: "",
          description: "",
          completed: false,
        },
      ],
    })
  }

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    const updatedMilestones = [...customPlan.milestones]
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value,
    }
    setCustomPlan({ ...customPlan, milestones: updatedMilestones })
  }

  const removeMilestone = (index: number) => {
    const updatedMilestones = customPlan.milestones.filter((_, i) => i !== index)
    setCustomPlan({ ...customPlan, milestones: updatedMilestones })
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <ArrowRight className={`w-4 h-4 mx-2 ${currentStep > step ? "text-blue-600" : "text-gray-400"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderTemplateSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Bước 1: Chọn loại kế hoạch cai thuốc</CardTitle>
        <CardDescription>Chọn phương pháp phù hợp với tình trạng và mong muốn của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planTemplates.map((template) => (
            <div
              key={template.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate?.id === template.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleSelectTemplate(template)}
            >
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{template.icon}</div>
                <h3 className="font-bold text-lg">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Thời gian:</span>
                  <Badge variant="outline">{template.duration}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Độ khó:</span>
                  <Badge
                    variant="outline"
                    className={
                      template.difficulty === "Dễ"
                        ? "text-green-600 border-green-600"
                        : template.difficulty === "Trung bình"
                          ? "text-yellow-600 border-yellow-600"
                          : template.difficulty === "Khó"
                            ? "text-red-600 border-red-600"
                            : ""
                    }
                  >
                    {template.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tỷ lệ thành công:</span>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    {template.successRate}
                  </Badge>
                </div>
              </div>

              {template.timeline.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-sm font-medium mb-2">Timeline:</h4>
                  <div className="space-y-1">
                    {template.timeline.slice(0, 2).map((item, index) => (
                      <div key={index} className="text-xs text-gray-600">
                        Tuần {item.week}: {item.goal}
                      </div>
                    ))}
                    {template.timeline.length > 2 && (
                      <div className="text-xs text-gray-500">+{template.timeline.length - 2} mốc khác...</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={() => setCurrentStep(2)} disabled={!selectedTemplate} className="flex items-center gap-2">
            Tiếp tục
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCustomization = () => (
    <Card>
      <CardHeader>
        <CardTitle>Bước 2: Tùy chỉnh kế hoạch</CardTitle>
        <CardDescription>Điều chỉnh chi tiết kế hoạch "{selectedTemplate?.name}" cho phù hợp với bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tên kế hoạch</Label>
            <Input
              id="title"
              value={customPlan.title}
              onChange={(e) => setCustomPlan({ ...customPlan, title: e.target.value })}
              placeholder="Ví dụ: Kế hoạch cai thuốc của tôi"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Phương pháp</Label>
            <Select
              value={customPlan.method}
              onValueChange={(value) => setCustomPlan({ ...customPlan, method: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gradual">Giảm dần</SelectItem>
                <SelectItem value="cold_turkey">Dừng ngay lập tức</SelectItem>
                <SelectItem value="nicotine_replacement">Thay thế nicotine</SelectItem>
                <SelectItem value="medication">Dùng thuốc hỗ trợ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Lý do cai thuốc</Label>
          <Textarea
            id="reason"
            value={customPlan.reason}
            onChange={(e) => setCustomPlan({ ...customPlan, reason: e.target.value })}
            placeholder="Ví dụ: Vì sức khỏe gia đình, tiết kiệm chi phí..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Ngày bắt đầu</Label>
            <Input
              id="startDate"
              type="date"
              value={customPlan.startDate}
              onChange={(e) => setCustomPlan({ ...customPlan, startDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetDate">Ngày mục tiêu</Label>
            <Input
              id="targetDate"
              type="date"
              value={customPlan.targetDate}
              onChange={(e) => setCustomPlan({ ...customPlan, targetDate: e.target.value })}
            />
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Các mốc thời gian</Label>
            <Button variant="outline" size="sm" onClick={addMilestone}>
              <Plus className="w-4 h-4 mr-1" />
              Thêm mốc
            </Button>
          </div>

          <div className="space-y-3">
            {customPlan.milestones.map((milestone, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Ngày</Label>
                    <Input
                      type="date"
                      value={milestone.date}
                      onChange={(e) => updateMilestone(index, "date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mục tiêu</Label>
                    <Input
                      value={milestone.goal}
                      onChange={(e) => updateMilestone(index, "goal", e.target.value)}
                      placeholder="Ví dụ: Giảm xuống 5 điếu/ngày"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mô tả</Label>
                    <div className="flex gap-2">
                      <Input
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, "description", e.target.value)}
                        placeholder="Chi tiết về mục tiêu"
                      />
                      <Button variant="outline" size="sm" onClick={() => removeMilestone(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Tips */}
        {selectedTemplate?.tips && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-blue-600" />
              Mẹo cho phương pháp "{selectedTemplate.name}"
            </h4>
            <ul className="space-y-1">
              {selectedTemplate.tips.map((tip, index) => (
                <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Quay lại
          </Button>
          <Button onClick={() => setCurrentStep(3)}>
            Xem trước
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderReview = () => (
    <Card>
      <CardHeader>
        <CardTitle>Bước 3: Xem trước và xác nhận</CardTitle>
        <CardDescription>Kiểm tra lại kế hoạch trước khi tạo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Tên kế hoạch</h4>
              <p className="text-lg font-semibold">{customPlan.title}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Phương pháp</h4>
              <Badge variant="outline">{customPlan.method}</Badge>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Thời gian</h4>
              <p>
                {new Date(customPlan.startDate).toLocaleDateString("vi-VN")} -{" "}
                {new Date(customPlan.targetDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Lý do cai thuốc</h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{customPlan.reason}</p>
          </div>
        </div>

        {/* Timeline Preview */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Timeline các mốc thời gian</h4>
          <div className="space-y-3">
            {customPlan.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{milestone.goal}</div>
                  <div className="text-sm text-gray-600">{milestone.description}</div>
                </div>
                <div className="text-sm text-gray-500">{new Date(milestone.date).toLocaleDateString("vi-VN")}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Chỉnh sửa
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNewPlanFlow(false)}>
              Hủy
            </Button>
            <Button onClick={handleCreatePlan}>Tạo kế hoạch</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kế hoạch cai thuốc</h1>
          <p className="text-gray-600">Tạo và quản lý kế hoạch cai thuốc của bạn</p>
        </div>
        <Button onClick={() => setShowNewPlanFlow(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tạo kế hoạch mới
        </Button>
      </div>

      {/* New Plan Creation Flow */}
      {showNewPlanFlow && (
        <div className="space-y-6">
          {renderStepIndicator()}

          {currentStep === 1 && renderTemplateSelection()}
          {currentStep === 2 && renderCustomization()}
          {currentStep === 3 && renderReview()}
        </div>
      )}

      {/* Existing Plans */}
      {!showNewPlanFlow && (
        <div className="space-y-4">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      {plan.title}
                      {plan.template && (
                        <Badge variant="secondary" className="ml-2">
                          {plan.template}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">{plan.reason}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={plan.status === "active" ? "default" : "secondary"}>
                      {plan.status === "active" ? "Đang thực hiện" : "Nháp"}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeletePlan(plan.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Phương pháp</div>
                    <div className="font-medium">
                      {plan.method === "gradual"
                        ? "Giảm dần"
                        : plan.method === "cold_turkey"
                          ? "Dừng ngay"
                          : plan.method === "nicotine_replacement"
                            ? "Thay thế nicotine"
                            : plan.method === "medication"
                              ? "Dùng thuốc"
                              : plan.method}
                    </div>
                  </div>

                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Ngày bắt đầu</div>
                    <div className="font-medium">{new Date(plan.startDate).toLocaleDateString("vi-VN")}</div>
                  </div>

                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600">Mục tiêu</div>
                    <div className="font-medium">{new Date(plan.targetDate).toLocaleDateString("vi-VN")}</div>
                  </div>
                </div>

                {plan.milestones.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Mốc thời gian
                    </h4>
                    <div className="space-y-2">
                      {plan.milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            milestone.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <button
                            onClick={() => toggleMilestone(plan.id, index)}
                            className={`flex-shrink-0 ${milestone.completed ? "text-green-600" : "text-gray-400"}`}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <div className="flex-1">
                            <div className="font-medium">{milestone.goal}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(milestone.date).toLocaleDateString("vi-VN")}
                            </div>
                          </div>
                          {milestone.completed && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Hoàn thành
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {plans.length === 0 && !showNewPlanFlow && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có kế hoạch cai thuốc</h3>
            <p className="text-gray-600 mb-4">Tạo kế hoạch cai thuốc đầu tiên để bắt đầu hành trình của bạn</p>
            <Button onClick={() => setShowNewPlanFlow(true)}>Tạo kế hoạch đầu tiên</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
