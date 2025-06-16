"use client"

import { useState, useEffect } from "react"
import { HomePage } from "@/components/home-page"
import { AddictionAssessment } from "@/components/addiction-assessment"
import { CostCalculator } from "@/components/cost-calculator"
import { GuestForum } from "@/components/guest-forum"
import { Guides } from "@/components/guides"
import { AuthForms } from "@/components/auth-forms"
import { ForgotPassword } from "@/components/forgot-password"
import { DashboardApp } from "@/components/dashboard/dashboard-app"

type ViewType = "landing" | "assessment" | "cost-calculator" | "resources" | "community" | "login" | "register" | "forgot-password" | "app"

interface UserData {
  email?: string
  name?: string
  [key: string]: any
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("landing")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("userData")

    if (token && userData) {
      setIsLoggedIn(true)
      setCurrentView("app")
    }
  }, [])

  const handleLogin = (userData?: UserData) => {
    const token = "auth_" + Date.now()
    localStorage.setItem("authToken", token)
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData))
    }
    setIsLoggedIn(true)
    setCurrentView("app")
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    setCurrentView("landing")
  }

  const handleToolToRegister = (toolData?: UserData) => {
    if (toolData) {
      localStorage.setItem("toolResults", JSON.stringify(toolData))
    }
    setCurrentView("register")
  }

  return (
    <>
      {currentView === "landing" && (
        <HomePage
          onAssessment={() => setCurrentView("assessment")}
          onCostCalculator={() => setCurrentView("cost-calculator")}
          onResources={() => setCurrentView("resources")}
          onCommunity={() => setCurrentView("community")}
          onRegister={() => setCurrentView("register")}
          onLogin={() => setCurrentView("login")}
        />
      )}

      {currentView === "assessment" && (
        <AddictionAssessment onBack={() => setCurrentView("landing")} onRegister={handleToolToRegister} />
      )}

      {currentView === "cost-calculator" && (
        <CostCalculator onBack={() => setCurrentView("landing")} onRegister={handleToolToRegister} />
      )}

      {currentView === "resources" && (
        <Guides onBack={() => setCurrentView("landing")} onRegister={() => setCurrentView("register")} />
      )}

      {currentView === "community" && (
        <GuestForum onBack={() => setCurrentView("landing")} onRegister={() => setCurrentView("register")} />
      )}

      {currentView === "login" && (
        <AuthForms
          mode="login"
          onBack={() => setCurrentView("landing")}
          onSuccess={handleLogin}
          onSwitchMode={() => setCurrentView("register")}
          onForgotPassword={() => setCurrentView("forgot-password")}
        />
      )}

      {currentView === "register" && (
        <AuthForms
          mode="register"
          onBack={() => setCurrentView("landing")}
          onSuccess={handleLogin}
          onSwitchMode={() => setCurrentView("login")}
        />
      )}

      {currentView === "forgot-password" && <ForgotPassword onBack={() => setCurrentView("login")} />}

      {currentView === "app" && <DashboardApp onLogout={handleLogout} />}
    </>
  )
}
