"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Calculator, FileText, Users, UserPlus, Menu, LogIn, LogOut, User } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context in real app
  const [user] = useState({ name: "Nguyễn Văn A", email: "user@example.com" }) // Mock user data

  const navItems = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/assessment", label: "Đánh giá", icon: Calculator },
    { href: "/cost-calculator", label: "Tính chi phí", icon: Calculator },
    { href: "/resources", label: "Tài liệu", icon: FileText },
    { href: "/community", label: "Cộng đồng", icon: Users },
  ]

  const handleLogout = () => {
    setIsLoggedIn(false)
    // Handle logout logic here
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Hồ sơ cá nhân
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Calculator className="h-4 w-4 mr-2" />
                      Bảng điều khiển
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Đăng nhập
                  </Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/register">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Đăng ký
                  </Link>
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
                    onClick={() => setIsMenuOpen(false)}
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
                    <div className="px-3 py-2 text-sm font-medium text-gray-900">Xin chào, {user.name}</div>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Hồ sơ cá nhân
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Calculator className="h-4 w-4 mr-2" />
                        Bảng điều khiển
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600"
                      onClick={() => {
                        handleLogout()
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
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Đăng nhập
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Đăng ký
                      </Link>
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
