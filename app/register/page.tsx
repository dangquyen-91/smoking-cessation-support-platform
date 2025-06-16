"use client"

import { AuthForms } from "@/components/auth-forms"
import { useRouter } from "next/navigation"

export default function Register() {
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
      mode="register"
      onBack={() => router.push("/")}
      onSuccess={handleSuccess}
      onSwitchMode={() => router.push("/login")}
    />
  )
}
