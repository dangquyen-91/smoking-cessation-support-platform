"use client"

import { AuthForms } from "@/components/auth-forms"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const handleSuccess = (userData?: any) => {
    const token = "auth_" + Date.now()
    localStorage.setItem("authToken", token)
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData))
    }
    router.push("/dashboard")
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
