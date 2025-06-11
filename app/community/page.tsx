"use client"

import { GuestForum } from "@/components/guest-forum"
import { useRouter } from "next/navigation"

export default function Community() {
  const router = useRouter()

  return <GuestForum onBack={() => router.push("/")} onRegister={() => router.push("/register")} />
}
