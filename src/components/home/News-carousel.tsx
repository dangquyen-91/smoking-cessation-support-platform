"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  link: string
}

export default function NewsCarousel() {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Hút thuốc và COVID-19",
      description: "COVID-19 khiến nhiều người cảm thấy căng thẳng, cô đơn hoặc lo lắng về sức khỏe của bản thân...",
      image: "/images/covid-warning.png",
      link: "#",
    },
    {
      id: 2,
      title: "Vquit tuyển chọn người tham gia nhận tin nhắn hỗ trợ cai thuốc",
      description: "Chương trình hỗ trợ cai thuốc lá qua tin nhắn điện thoại đang tìm kiếm người tham gia...",
      image: "/images/quit-smoking.png",
      link: "#",
    },
    {
      id: 3,
      title: "Thông báo tạm ngừng dịch vụ tin nhắn hỗ trợ cai thuốc lá trên website vquit.vn",
      description: "Dịch vụ tin nhắn hỗ trợ cai thuốc lá sẽ tạm ngừng hoạt động để nâng cấp hệ thống...",
      image: "/images/cigarette.png",
      link: "#",
    },
  ]

  const [startIndex, setStartIndex] = useState(0)
  const itemsToShow = 3
  const maxStartIndex = Math.max(0, newsItems.length - itemsToShow)

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1))
  }

  return (
    <div className="w-full bg-gray-50 text-gray-900 py-8">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-center w-full">TIN TỨC</h2>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-red-600 text-red-600 hover:bg-red-100 hover:text-red-700"
          onClick={handlePrevious}
          disabled={startIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-red-600 text-red-600 hover:bg-red-100 hover:text-red-700"
          onClick={handleNext}
          disabled={startIndex >= maxStartIndex}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {newsItems.slice(startIndex, startIndex + itemsToShow).map((item) => (
        <Card
          key={item.id}
          className="bg-white border border-gray-300 overflow-hidden flex flex-col shadow-md"
        >
          <div className="aspect-video relative">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="text-lg font-bold text-red-600 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="bg-red-600 hover:bg-red-700 text-white w-full h-10">Đọc thêm</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
</div>
  )
}
