"use client"

import { CostCalculator } from "@/components/cost-calculator"
import { useRouter } from "next/navigation"

export default function CostCalculatorPage() {
  const router = useRouter()

  const handleRegisterWithResults = (toolData?: any) => {
    if (toolData) {
      localStorage.setItem("toolResults", JSON.stringify(toolData))
    }
    router.push("/register")
  }

  return <CostCalculator onBack={() => router.push("/")} onRegister={handleRegisterWithResults} />
}
