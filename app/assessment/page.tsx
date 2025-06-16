"use client"

import { AddictionAssessment } from "@/components/addiction-assessment"
import { useRouter } from "next/navigation"

export default function Assessment() {
  const router = useRouter()

  const handleRegisterWithResults = (toolData?: any) => {
    if (toolData) {
      localStorage.setItem("toolResults", JSON.stringify(toolData))
    }
    router.push("/register")
  }

  return <AddictionAssessment onBack={() => router.push("/")} onRegister={handleRegisterWithResults} />
}
