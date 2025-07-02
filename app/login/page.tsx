"use client"

import { AuthForms } from "@/components/auth-forms"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const handleSuccess = (authData?: { user: any; token: string }) => {
    if (!authData) return

    // Lưu user và token mới vào localStorage
    localStorage.setItem("authToken", authData.token)
    localStorage.setItem("userData", JSON.stringify(authData.user))

    // Debug: kiểm tra role trả về
    console.log("Login success, role:", authData.user.role)

    if (authData.user.role === "admin") {
      router.push("/admin")
    } else if (authData.user.role === "coach") {
      router.push("/coach")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <AuthForms
      mode="login"
      onBack={() => router.push("/")}
      onSuccess={handleSuccess}
      onSwitchMode={() => router.push("/register")}
      onForgotPassword={() => router.push("/forgot-password")}
    />
  )
}