"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Lightbulb, Target, Heart, TrendingUp, Send } from "lucide-react"
import { useState } from "react"

export function AIConsulting() {
  const [question, setQuestion] = useState("")

  const aiRecommendations = [
    {
      type: "Kế hoạch cá nhân",
      title: "Kế hoạch cai thuốc phù hợp với bạn",
      description: "Dựa trên 45 ngày không hút thuốc và tiến trình hiện tại",
      suggestions: [
        "Tiếp tục duy trì thói quen tập thể dục buổi sáng",
        "Thêm kỹ thuật thiền 10 phút mỗi ngày",
        "Tăng cường uống nước khi có cơn thèm",
      ],
      confidence: 92,
    },
    {
      type: "Sức khỏe",
      title: "Cải thiện sức khỏe tiếp theo",
      description: "Những bước để tối ưu hóa sức khỏe sau khi cai thuốc",
      suggestions: [
        "Bổ sung vitamin C và E để phục hồi phổi",
        "Tăng cường thực phẩm giàu chất chống oxy hóa",
        "Kiểm tra sức khỏe định kỳ sau 3 tháng",
      ],
      confidence: 88,
    },
    {
      type: "Tâm lý",
      title: "Quản lý stress và cảm xúc",
      description: "Chiến lược để duy trì tinh thần tích cực",
      suggestions: [
        "Thực hành kỹ thuật thở sâu khi căng thẳng",
        "Tham gia hoạt động xã hội tích cực",
        "Ghi nhật ký cảm xúc hàng ngày",
      ],
      confidence: 85,
    },
  ]

  const chatHistory = [
    {
      id: 1,
      question: "Tôi cảm thấy thèm thuốc khi uống cà phê, làm sao để khắc phục?",
      answer:
        "Đây là một trigger phổ biến. Tôi khuyên bạn:\n\n1. Thay đổi thói quen uống cà phê - thử uống ở địa điểm khác\n2. Kết hợp với hoạt động khác như đọc sách, nghe nhạc\n3. Giảm dần lượng caffeine để tránh kích thích\n4. Thử các loại trà thảo mộc thay thế\n\nViệc thay đổi môi trường và thói quen sẽ giúp phá vỡ liên kết tâm lý giữa cà phê và thuốc lá.",
      time: "Hôm qua",
    },
    {
      id: 2,
      question: "Tôi đã cai được 45 ngày, khi nào cơn thèm sẽ hoàn toàn biến mất?",
      answer:
        "Chúc mừng bạn đã đạt được 45 ngày! Đây là một thành tích tuyệt vời.\n\nVề cơn thèm thuốc:\n- Cơn thèm vật lý thường giảm mạnh sau 2-4 tuần\n- Cơn thèm tâm lý có thể kéo dài 3-6 tháng\n- Một số người vẫn có cơn thèm nhẹ thỉnh thoảng sau 1 năm\n\nTuy nhiên, cường độ và tần suất sẽ giảm dần theo thời gian. Hãy tiếp tục duy trì những thói quen tích cực bạn đã xây dựng!",
      time: "2 ngày trước",
    },
  ]

  const quickQuestions = [
    "Làm sao để vượt qua cơn thèm thuốc?",
    "Thực phẩm nào giúp giảm cơn thèm nicotine?",
    "Khi nào tôi sẽ cảm thấy khỏe hơn?",
    "Làm sao để tránh tăng cân khi cai thuốc?",
    "Có nên dùng thuốc hỗ trợ cai thuốc không?",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">A.I. Tư vấn cá nhân hóa</h1>
        <p className="text-gray-600">Nhận gợi ý và lời khuyên thông minh dựa trên dữ liệu của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                Gợi ý A.I. cho bạn
              </CardTitle>
              <CardDescription>Được tạo dựa trên tiến trình và dữ liệu cá nhân của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {rec.type === "Kế hoạch cá nhân" && <Target className="h-5 w-5 text-green-600" />}
                      {rec.type === "Sức khỏe" && <Heart className="h-5 w-5 text-red-600" />}
                      {rec.type === "Tâm lý" && <Lightbulb className="h-5 w-5 text-yellow-600" />}
                      <Badge variant="secondary">{rec.type}</Badge>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {rec.confidence}% độ tin cậy
                    </Badge>
                  </div>

                  <h3 className="font-medium text-gray-900 mb-2">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>

                  <div className="space-y-2">
                    {rec.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Áp dụng
                    </Button>
                    <Button size="sm" variant="outline">
                      Tìm hiểu thêm
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat with AI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                Hỏi đáp với A.I.
              </CardTitle>
              <CardDescription>Đặt câu hỏi và nhận câu trả lời tức thì</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Chat History */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">{chat.question}</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="h-4 w-4 text-purple-600" />
                          <span className="text-xs text-gray-600">A.I. Assistant</span>
                        </div>
                        <p className="text-sm whitespace-pre-line">{chat.answer}</p>
                        <p className="text-xs text-gray-500 mt-2">{chat.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Đặt câu hỏi cho A.I..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Questions */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Câu hỏi gợi ý:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestion(q)}
                        className="text-xs"
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Thống kê A.I.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-blue-700">Gợi ý đã tạo</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-green-700">Độ chính xác</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">23</div>
                <div className="text-sm text-purple-700">Câu hỏi đã trả lời</div>
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card>
            <CardHeader>
              <CardTitle>Tính năng A.I.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm">Kế hoạch thông minh</span>
                </div>
                <p className="text-xs text-gray-600">Tạo kế hoạch cai thuốc cá nhân hóa</p>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-sm">Theo dõi sức khỏe</span>
                </div>
                <p className="text-xs text-gray-600">Phân tích và dự đoán cải thiện</p>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-sm">Gợi ý thông minh</span>
                </div>
                <p className="text-xs text-gray-600">Lời khuyên dựa trên dữ liệu</p>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Đánh giá A.I.</CardTitle>
              <CardDescription>Giúp chúng tôi cải thiện A.I.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="mb-2">Gợi ý A.I. có hữu ích không?</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      👍 Có
                    </Button>
                    <Button size="sm" variant="outline">
                      👎 Không
                    </Button>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Gửi phản hồi chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
