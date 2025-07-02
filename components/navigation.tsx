"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Calculator, FileText, Users, UserPlus, Menu, LogIn, LogOut, User, BarChart } from "lucide-react"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavigationProps {
  isLoggedIn: boolean
  onLogin: () => void
  onRegister: () => void
  onLogout: () => void
  onNavigate: (path: string) => void
}

export function Navigation({ isLoggedIn, onLogin, onRegister, onLogout, onNavigate }: NavigationProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Load user data if logged in
    if (isLoggedIn) {
      const savedUserData = localStorage.getItem("userData")
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData))
      }
    }
  }, [isLoggedIn])

  const navItems = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/community", label: "Cộng đồng", icon: Users, action: () => onNavigate("guest-forum") },
  ]

  const handleNavigation = (item: any, e: React.MouseEvent) => {
    e.preventDefault()
    if (item.action) {
      item.action()
    }
    setIsMenuOpen(false)
  }

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate("app")
    setIsMenuOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault()
              onNavigate("landing")
            }}
          >
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CL</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Cai Thuốc Lá</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                  onClick={(e) => handleNavigation(item, e)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {userData?.fullName ? getInitials(userData.fullName) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{userData?.fullName || "Người dùng"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <a
                      href="#"
                      className="flex items-center"
                      onClick={(e) => {
                        e.preventDefault()
                        onNavigate("app")
                        setIsMenuOpen(false)
                      }}
                    >
                      <BarChart className="h-4 w-4 mr-2" />
                      Dashboard
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="#"
                      className="flex items-center"
                      onClick={(e) => {
                        e.preventDefault()
                        onNavigate("app")
                        setIsMenuOpen(false)
                      }}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Hồ sơ cá nhân
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault()
                    onLogin()
                  }}
                >
                  <a href="#">
                    <LogIn className="h-4 w-4 mr-2" />
                    Đăng nhập
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault()
                    onRegister()
                  }}
                >
                  <a href="#">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Đăng ký
                  </a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                    onClick={(e) => handleNavigation(item, e)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              {/* Mobile Auth Section */}
              <div className="pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-gray-900">
                      Xin chào, {userData?.fullName || "Người dùng"}
                    </div>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <a href="#" onClick={handleDashboardClick}>
                        <BarChart className="h-4 w-4 mr-2" />
                        Dashboard
                      </a>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <a href="#" onClick={handleDashboardClick}>
                        <User className="h-4 w-4 mr-2" />
                        Hồ sơ cá nhân
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600"
                      onClick={() => {
                        onLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          onLogin()
                          setIsMenuOpen(false)
                        }}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Đăng nhập
                      </a>
                    </Button>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          onRegister()
                          setIsMenuOpen(false)
                        }}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Đăng ký
                      </a>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
