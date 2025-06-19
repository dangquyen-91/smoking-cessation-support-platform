"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react"
import { useState } from "react"

interface AddictionAssessmentProps {
  onBack: () => void
  onRegister: () => void
}

export function AddictionAssessment({ onBack, onRegister }: AddictionAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    cigarettesPerDay: "",
    smokingYears: "",
    firstCigaretteTime: "",
    hardestToGiveUp: "",
    smokingWhenSick: "",
    smokingFrequency: "",
    costPerPack: "",
    packsPerWeek: "",
  })
  const [result, setResult] = useState<any>(null)

  const questions = [
    {
      id: "cigarettesPerDay",
      title: "Bạn hút bao nhiêu điếu thuốc mỗi ngày?",
      type: "input",
      inputType: "number",
      placeholder: "Ví dụ: 15",
    },
    {
      id: "smokingYears",
      title: "Bạn đã hút thuốc bao nhiêu năm?",
      type: "input",
      inputType: "number",
      placeholder: "Ví dụ: 10",
    },
    {
      id: "firstCigaretteTime",
      title: "Bạn hút điếu thuốc đầu tiên sau khi thức dậy bao lâu?",
      type: "radio",
      options: [
        { value: "5", label: "Trong vòng 5 phút", score: 3 },
        { value: "30", label: "6-30 phút", score: 2 },
        { value: "60", label: "31-60 phút", score: 1 },
        { value: "60+", label: "Sau 60 phút", score: 0 },
      ],
    },
    {
      id: "hardestToGiveUp",
      title: "Điếu thuốc nào khó bỏ nhất?",
      type: "radio",
      options: [
        { value: "first", label: "Điếu đầu tiên buổi sáng", score: 1 },
        { value: "other", label: "Các điếu khác", score: 0 },
      ],
    },
    {
      id: "smokingWhenSick",
      title: "Bạn có hút thuốc khi bị ốm và phải nằm giường không?",
      type: "radio",
      options: [
        { value: "yes", label: "Có", score: 1 },
        { value: "no", label: "Không", score: 0 },
      ],
    },
    {
      id: "smokingFrequency",
      title: "Bạn hút thuốc thường xuyên hơn vào thời gian nào?",
      type: "radio",
      options: [
        { value: "morning", label: "Buổi sáng", score: 1 },
        { value: "evening", label: "Buổi tối", score: 0 },
        { value: "all_day", label: "Đều đặn cả ngày", score: 1 },
      ],
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateResult = () => {
    const cigarettesPerDay = Number.parseInt(formData.cigarettesPerDay) || 0
    const smokingYears = Number.parseInt(formData.smokingYears) || 0

    // Calculate Fagerstrom score
    let fagerstromScore = 0

    // Cigarettes per day scoring
    if (cigarettesPerDay <= 10) fagerstromScore += 0
    else if (cigarettesPerDay <= 20) fagerstromScore += 1
    else if (cigarettesPerDay <= 30) fagerstromScore += 2
    else fagerstromScore += 3

    // Add other question scores
    questions.forEach((q) => {
      if (q.type === "radio" && formData[q.id as keyof typeof formData]) {
        const selectedOption = q.options?.find((opt) => opt.value === formData[q.id as keyof typeof formData])
        if (selectedOption) fagerstromScore += selectedOption.score
      }
    })

    // Calculate cost impact
    const costPerPack = Number.parseInt(formData.costPerPack) || 30000
    const dailyCost = (cigarettesPerDay * costPerPack) / 20
    const monthlyCost = dailyCost * 30
    const yearlyCost = dailyCost * 365
    const lifetimeCost = yearlyCost * smokingYears

    // Determine addiction level
    let addictionLevel = ""
    let addictionColor = ""
    let recommendations = []

    if (fagerstromScore <= 2) {
      addictionLevel = "Mức độ nghiện thấp"
      addictionColor = "text-green-600"
      recommendations = [
        "Bạn có cơ hội cao để cai thuốc thành công",
        "Thử phương pháp cai thuốc đột ngột",
        "Tập trung vào thay đổi thói quen",
        "Tham gia nhóm hỗ trợ cộng đồng",
      ]
    } else if (fagerstromScore <= 4) {
      addictionLevel = "Mức độ nghiện trung bình"
      addictionColor = "text-yellow-600"
      recommendations = [
        "Nên có kế hoạch cai thuốc chi tiết",
        "Cân nhắc sử dụng sản phẩm thay thế nicotine",
        "Tìm kiếm hỗ trợ từ chuyên gia",
        "Chuẩn bị tinh thần cho quá trình cai thuốc",
      ]
    } else {
      addictionLevel = "Mức độ nghiện cao"
      addictionColor = "text-red-600"
      recommendations = [
        "Nên tham khảo ý kiến bác sĩ",
        "Sử dụng liệu pháp thay thế nicotine",
        "Cần hỗ trợ chuyên nghiệp từ coach",
        "Chuẩn bị kỹ lưỡng cho hành trình cai thuốc",
      ]
    }

    setResult({
      fagerstromScore,
      addictionLevel,
      addictionColor,
      recommendations,
      cigarettesPerDay,
      smokingYears,
      dailyCost,
      monthlyCost,
      yearlyCost,
      lifetimeCost,
    })
  }

  const nextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResult()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRegisterWithResults = () => {
    if (result) {
      const toolData = {
        type: "addiction-assessment",
        addictionLevel: result.addictionLevel,
        fagerstromScore: result.fagerstromScore,
        cigarettesPerDay: result.cigarettesPerDay,
        smokingYears: result.smokingYears,
        recommendations: result.recommendations,
        completedAt: new Date().toISOString(),
      }
      localStorage.setItem("toolResults", JSON.stringify(toolData))
    }
    onRegister()
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={onBack} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại trang chủ
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Kết quả đánh giá mức độ nghiện</h1>
            <p className="text-gray-600">Phân tích chi tiết về tình trạng hút thuốc của bạn</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Addiction Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Mức độ nghiện nicotine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`text-4xl font-bold ${result.addictionColor} mb-2`}>{result.fagerstromScore}/10</div>
                  <Badge className={`${result.addictionColor} text-lg px-4 py-2`} variant="outline">
                    {result.addictionLevel}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Điểm Fagerstrom</span>
                      <span>{result.fagerstromScore}/10</span>
                    </div>
                    <Progress value={(result.fagerstromScore / 10) * 100} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{result.cigarettesPerDay}</div>
                      <div className="text-sm text-blue-700">Điếu/ngày</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{result.smokingYears}</div>
                      <div className="text-sm text-purple-700">Năm hút thuốc</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Phân tích chi phí
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-sm text-red-600 font-medium">Chi phí hàng ngày</div>
                    <div className="text-2xl font-bold text-red-600">{result.dailyCost.toLocaleString()}đ</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-sm text-orange-600 font-medium">Chi phí hàng tháng</div>
                    <div className="text-2xl font-bold text-orange-600">{result.monthlyCost.toLocaleString()}đ</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-sm text-yellow-600 font-medium">Chi phí hàng năm</div>
                    <div className="text-2xl font-bold text-yellow-600">{result.yearlyCost.toLocaleString()}đ</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 font-medium">Tổng chi phí đã bỏ ra</div>
                    <div className="text-2xl font-bold text-gray-800">{result.lifetimeCost.toLocaleString()}đ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Gợi ý cho bạn
              </CardTitle>
              <CardDescription>Dựa trên kết quả đánh giá của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-800">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="mt-6 bg-green-600 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Sẵn sàng bắt đầu hành trình cai thuốc?</h3>
              <p className="mb-4 opacity-90">Đăng ký tài khoản để nhận hỗ trợ chuyên nghiệp và theo dõi tiến trình</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" onClick={handleRegisterWithResults}>
                  Đăng ký ngay - Lưu kết quả
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                  Tìm hiểu thêm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep - 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại trang chủ
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Đánh giá mức độ nghiện</h1>
          <p className="text-gray-600">Trả lời các câu hỏi để hiểu rõ mức độ phụ thuộc nicotine</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Câu hỏi {currentStep}/{questions.length}
              </CardTitle>
              <Badge variant="outline">{Math.round((currentStep / questions.length) * 100)}%</Badge>
            </div>
            <Progress value={(currentStep / questions.length) * 100} />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{currentQuestion.title}</h3>

              {currentQuestion.type === "input" && (
                <div>
                  <Input
                    type={currentQuestion.inputType}
                    placeholder={currentQuestion.placeholder}
                    value={formData[currentQuestion.id as keyof typeof formData]}
                    onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}

              {currentQuestion.type === "radio" && (
                <RadioGroup
                  value={formData[currentQuestion.id as keyof typeof formData]}
                  onValueChange={(value) => handleInputChange(currentQuestion.id, value)}
                >
                  {currentQuestion.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                Quay lại
              </Button>
              <Button onClick={nextStep} disabled={!formData[currentQuestion.id as keyof typeof formData]}>
                {currentStep === questions.length ? "Xem kết quả" : "Tiếp theo"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
