"use client"

import { Guides } from "@/components/guides"
import { useRouter } from "next/navigation"

export default function Resources() {
  const router = useRouter()

  return <Guides onBack={() => router.push("/")} onRegister={() => router.push("/register")} />
}
