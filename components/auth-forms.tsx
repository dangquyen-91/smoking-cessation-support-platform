"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Check, CreditCard, Smartphone, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { SocialAuth } from "./social-auth"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

interface AuthFormsProps {
  mode: "login" | "register"
  onBack: () => void
  onSuccess: (userData?: any) => void
  onSwitchMode: () => void
  onForgotPassword?: () => void
}

export function AuthForms({ mode, onBack, onSuccess, onSwitchMode, onForgotPassword }: AuthFormsProps) {
  if (mode === "login") {
    return (
      <LoginForm
        onBack={onBack}
        onSuccess={onSuccess}
        onSwitchMode={onSwitchMode}
        onForgotPassword={onForgotPassword}
      />
    )
  }
  return (
    <RegisterForm
      onBack={onBack}
      onSuccess={onSuccess}
      onSwitchMode={onSwitchMode}
    />
  )
}
