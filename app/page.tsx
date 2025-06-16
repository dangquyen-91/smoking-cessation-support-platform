"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HomePage } from "@/components/home-page"

export default function Home() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Kiểm tra token đăng nhập
    const token = localStorage.getItem("authToken")
    if (token) {
      setIsLoggedIn(true)
      router.replace("/dashboard") // Điều hướng nâng cao: dùng replace để không cho back về landing nếu đã login
    } else {
      setIsLoggedIn(false)
    }
    setIsChecking(false)
  }, [router])

  // Hàm logout nâng cao
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    router.push("/")
  }

  if (isChecking) return null // Đợi kiểm tra xong mới render

  // Nếu chưa đăng nhập, hiển thị landing với các nút điều hướng
  return (
    <HomePage
      onAssessment={() => router.push("/assessment")}
      onCostCalculator={() => router.push("/cost-calculator")}
      onResources={() => router.push("/resources")}
      onCommunity={() => router.push("/community")}
      onRegister={() => router.push("/register")}
      onLogin={() => router.push("/login")}
    />
  )
}
